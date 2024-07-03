import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { set, useForm } from "react-hook-form";
import { env } from "../env/env";
import BackIcon from "../assets/png/back.png";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CircularProgress from "@mui/material/CircularProgress";
import JsonView from "@uiw/react-json-view";
import {
  Container,
  HeadingWrapper,
  SendButton,
  Wrapper,
  ResponseField,
  TitleContainer,
  TitleHeading,
  CardHeader,
  CardBody,
  FormContainer,
  ButtonContainer,
  OnPayloadContainer,
  IconsContainer,
  TitleInfo,
  ResetContainer,
  InLineContainer,
  CallContainer,
  WaitingContainer,
  Message,
  SecondaryTitleHeading,
  Arrow,
  PairHeader,
} from "../styled/requestExecuter.style";
import RenderInput from "./renderInput";
import { useEffect } from "react";
import MakeSlopeChart from "./d3-visualization/MakeMarkovChart";
import ReplayIcon from "@mui/icons-material/Replay";
import Collapse from "@mui/material/Collapse";
import VerticalLinearStepper, {
  QontoConnector,
} from "./verticalProtocolsSteps";
import { StepContent } from "@mui/material";
import { GenericModal } from "./d3-visualization/ModalUI";
import { JourneyDisplay } from "./JourneyUI/JourneyDisplay";

const RequestExecuter = ({ transactionId, handleBack }) => {
  const [protocolCalls, setProtocolCalls] = useState({});
  const [inputFieldsData, setInputFieldsData] = useState({});
  const [session, setSession] = useState({});
  const [additionalFlows, setAdditionalFlows] = useState(null);
  const [showAddRequestButton, setShowAddRequestButton] = useState(false);
  const [currentConfig, setCurrentConfig] = useState("");
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const requestCount = useRef(0);
  const tempDefaultValue = useRef({});
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
    trigger,
  } = useForm();

  useEffect(() => {
    getSession();
  }, [transactionId]);

  useEffect(() => {
    const eventSource = new EventSource(`${env.sandBox}/event/unsolicited`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setSession(data);
      setAdditionalFlows(data.additioalFlows);
      setInputFieldsData(data.input);
      setProtocolCalls(data.protocolCalls);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    let firstPayload = false;
    let stopMapper = false;

    console.log("additionalFlowActive", session?.additionalFlowActive);

    const currentProtocolCalls =
      session?.additionalFlowActive && session?.additionalFlowConfig
        ? session.additionalFlowConfig.protocolCalls
        : session.protocolCalls;

    if (!currentProtocolCalls) {
      return;
    }

    Object.entries(currentProtocolCalls).map((data) => {
      const [, call] = data;
      if (call.shouldRender === true && call.executed === false) {
        setCurrentConfig(call.config);
      }
      if (firstPayload || stopMapper) return null;
      if (!call.type.startsWith("on_") && !call.businessPayload) {
        requestCount.current = 0;
        stopMapper = true;
      }
      if (!call.type.startsWith("on_") || call.businessPayload) {
        return null;
      }
      firstPayload = true;
      const session = setTimeout(() => {
        getSession();
        requestCount.current += 1;
      }, 3000);
      if (requestCount.current > 2) {
        clearTimeout(session);
        toast.error("Response timeout");
        sessionTimeout(call.config);
        setShowError(true);
      }
      return null;
    });
  }, [protocolCalls]);

  // auto continue form
  const checkFormFields = (config) => {
    const inputFields = inputFieldsData[config];
    const call = protocolCalls[config];
    if (!inputFields) return false;
    for (let item of inputFields) {
      if (item.type === "form") {
        continue;
      }
      if (
        item.defaultValue ||
        call?.businessPayload?.[item.key] ||
        getValues(item.key) ||
        tempDefaultValue.current[item.key]
      ) {
        continue;
      }
      return false;
    }
    return true;
  };

  useEffect(() => {
    const allFieldsFilled = checkFormFields(currentConfig);
    // console.log("allFieldsFilled", allFieldsFilled);
    if (allFieldsFilled && !showError) {
      // auto send next prequest
      // sendRequest(watch(), protocolCalls[currentConfig]);
      // toggleCollapse(protocolCalls[currentConfig]);
    } else {
      if (currentConfig) toggleCollapse(protocolCalls[currentConfig]);
    }
  }, [currentConfig, setValue]);

  const storeDefaultValue = (key, value) => {
    tempDefaultValue.current = { ...tempDefaultValue.current, [key]: value };
  };

  const handleSend = async (call) => {
    await sendRequest(watch(), call);
  };

  const sessionTimeout = async (config) => {
    setShowAddRequestButton(false);

    try {
      const header = {};
      header.headers = {
        ...header.headers,
        "Content-Type": "application/json",
      };

      const res = await axios.post(
        `${env.sandBox}/mapper/timeout`,
        JSON.stringify({ config, transactionId }),
        header
      );

      setInputFieldsData(res.data.session.input);
      setProtocolCalls(res.data.session.protocolCalls);
    } catch (e) {
      console.log("Error while fetching session data", e);
      toast.error(JSON.stringify(e?.message || "Something went wrong"));
    }
  };

  const getSession = async () => {
    setShowAddRequestButton(false);

    try {
      const header = {};
      header.headers = {
        ...header.headers,
        "Content-Type": "application/json",
      };

      const res = await axios.get(
        `${env.sandBox}/cache?transactionid=jm_${transactionId}`,
        header
      );

      setSession(res.data);
      setAdditionalFlows(res.data.additioalFlows);
      setInputFieldsData(res.data.input);
      setProtocolCalls(res.data.protocolCalls);
    } catch (e) {
      console.log("Error while fetching session data", e);
      toast.error(JSON.stringify(e?.message || "Something went wrong"));
    }
  };

  const toggleCollapse = (call) => {
    // if (session.additionalFlowActive) {
    //   setSession((preData) => {
    //     preData.additionalFlowConfig.protocolCalls[call.config] = {
    //       ...preData.additionalFlowConfig.protocolCalls[call.config],
    //       isCollapsed: !call.isCollapsed,
    //     };
    //   });
    // }

    setProtocolCalls((prevData) => {
      prevData[call.config] = {
        ...prevData[call.config],
        isCollapsed: !call.isCollapsed,
      };

      // if(prevData[call.cofig].unsolicited) {

      // }

      return { ...prevData };
    });
  };

  const displayOnCallData = (call) => {
    const renderedResponse = call.businessPayload.map((item) => {
      return (
        <ResponseField>
          <JsonView
            value={item}
            style={{ fontSize: "16px" }}
            displayDataTypes={false}
          />
          {/* {JSON.stringify(item)} */}
        </ResponseField>
      );
    });
    return (
      <OnPayloadContainer>
        {renderedResponse}
        <ButtonContainer>
          <SendButton
            disabled={!call?.becknPayload}
            onClick={() => {
              navigator.clipboard.writeText(
                JSON.stringify(call.becknPayload, null, 2)
              );
              toast.success("Payload copied!");
            }}
          >
            Copy Beckn Payload
          </SendButton>
        </ButtonContainer>
      </OnPayloadContainer>
    );
  };

  const sendRequest = async (e, call) => {
    setIsLoading(true);
    setShowAddRequestButton(false);

    e = { ...e, ...tempDefaultValue.current };

    // console.log("e", e);
    // console.log("call", call);

    if (call.type === "form") {
      const formUrl = e[call.formUrlKey];
      window.open(formUrl, "_blank", "noreferrer");
    }

    const data = {};
    Object.entries(e).map((item) => {
      const [key, value] = item;

      if (key.includes("Tag")) {
        const parsedData = JSON.parse(value);
        data[key] = parsedData;
        return;
      }

      data[key] = value;
    });

    try {
      const header = {};
      header.headers = {
        ...header.headers,
        "Content-Type": "application/json",
      };

      const res = await axios.post(
        `${env.sandBox}/mapper/${call.config}`,
        JSON.stringify({
          transactionId: transactionId,
          payload: data,
        }),
        header
      );

      setSession(res.data.session);
      setProtocolCalls(res.data.session.protocolCalls);
    } catch (e) {
      console.log("Error while fetching session data", e);
      toast.error(JSON.stringify(e?.message || "Something went wrong"));
    } finally {
      setIsLoading(false);
    }
  };

  const replayTranscation = async (config) => {
    setShowAddRequestButton(false);
    setShowError(false);
    try {
      const header = {};
      header.headers = {
        ...header.headers,
        "Content-Type": "application/json",
      };

      const res = await axios.post(
        `${env.sandBox}/mapper/repeat`,
        JSON.stringify({
          transactionId: transactionId,
          config: config,
        }),
        header
      );
      setProtocolCalls(res.data.session.protocolCalls);
      setCurrentConfig(config);
    } catch (e) {
      console.log("Error while calling mapper.repeat", e);
      toast.error(JSON.stringify(e?.message || "Something went wrong"));
    }
  };

  const addFlow = async () => {
    setShowAddRequestButton(false);

    try {
      const header = {};
      header.headers = {
        ...header.headers,
        "Content-Type": "application/json",
      };

      const res = await axios.post(
        `${env.sandBox}/mapper/addFlow`,
        JSON.stringify({
          configName: "metro-cancel-flow-1",
          transactionId: transactionId,
        }),
        header
      );

      setProtocolCalls(res.data.session.protocolCalls);
      setInputFieldsData(res.data.session.input);
    } catch (e) {
      console.log("Error while calling mapper.repeat", e);
      toast.error(JSON.stringify(e?.message || "Something went wrong"));
    }
  };

  const getOnCallData = () => {
    if (showError) return <div>{`Error: RESPONSE TIMEOUT!`}</div>;
    return (
      <WaitingContainer>
        <Message>WAITING FOR RESPONSE</Message>
        <CircularProgress />
      </WaitingContainer>
    );
  };
  // console.log()
  const renderRequestContainer = (call, inputField) => {
    return (
      <Step key={call.config} connector={<QontoConnector />} active={true}>
        {/* <StepLabel>{call.config}</StepLabel> */}
        <StepContent>
          <CallContainer>
            <CardHeader onClick={() => toggleCollapse(call)}>
              <HeadingWrapper>{call.config}</HeadingWrapper>
              <InLineContainer>
                {call.type !== "form" && !call.type.startsWith("on_") && (
                  <ResetContainer
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalOpen(true);
                      setSelectedConfig(call.config);
                    }}
                  >
                    <div>View Flow</div>
                  </ResetContainer>
                )}
                {!call.type.startsWith("on_") && (
                  <ResetContainer
                    onClick={() => replayTranscation(call.config)}
                  >
                    <div>Reset</div>
                    <ReplayIcon />
                  </ResetContainer>
                )}

                <ResetContainer>
                  <IconsContainer rotation={call.isCollapsed ? 270 : 90}>
                    <img
                      src={BackIcon}
                      alt="Description"
                      width={15}
                      height={15}
                    />
                  </IconsContainer>
                </ResetContainer>
              </InLineContainer>
            </CardHeader>
            <CardBody isCollapsed={call.isCollapsed}>
              {call.type.startsWith("on_") ? (
                <>
                  {call.businessPayload
                    ? displayOnCallData(call)
                    : getOnCallData()}
                </>
              ) : (
                <FormContainer
                  onSubmit={handleSubmit((data) => {
                    sendRequest(data, call);
                  })}
                >
                  {inputField[call.config].map((item) => (
                    <RenderInput
                      data={{
                        ...item,
                        config: call.config,
                        currentConfig: currentConfig,
                        defaultValue:
                          call?.businessPayload?.[item.key] ||
                          item.defaultValue,
                        businessPayload:
                          protocolCalls[call.config].unsolicited
                            ?.businessPayload ||
                          protocolCalls[call.preRequest]?.businessPayload,
                        session: session,
                      }}
                      control={control}
                      errors={errors}
                      watch={watch}
                      setValue={setValue}
                      storeDefaultValue={storeDefaultValue}
                    />
                  ))}
                </FormContainer>
              )}
            </CardBody>
            {!call.type.startsWith("on_") && (
              <ButtonContainer>
                <SendButton
                  disabled={!call?.becknPayload || call.type === "form"}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(call.becknPayload, null, 2)
                    );
                    toast.success("Payload copied!");
                  }}
                >
                  Copy Beckn Payload
                </SendButton>
                <SendButton
                  disabled={
                    call.executed || isLoading || !checkFormFields(call.config)
                  }
                  type="submit"
                  onClick={() => handleSend(call)}
                >
                  {call.type === "form" ? "Continue" : "Send"}
                </SendButton>
              </ButtonContainer>
            )}
          </CallContainer>
        </StepContent>
      </Step>
    );
  };
  function RequestCard({ call, inputField }) {
    return (
      <>
        <CallContainer key={call.config + call.config}>
          <CardHeader onClick={() => toggleCollapse(call)}>
            {/* <HeadingWrapper>{call.config}</HeadingWrapper> */}
            <span>{call.config}</span>
            <InLineContainer>
              {call.type !== "form" && !call.type.startsWith("on_") && (
                <ResetContainer
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalOpen(true);
                    setSelectedConfig(call.config);
                  }}
                >
                  <div>View Flow</div>
                </ResetContainer>
              )}
              {!call.type.startsWith("on_") && (
                <ResetContainer onClick={() => replayTranscation(call.config)}>
                  <div>Reset</div>
                  <ReplayIcon />
                </ResetContainer>
              )}

              <ResetContainer>
                <IconsContainer rotation={call.isCollapsed ? 270 : 90}>
                  <img
                    src={BackIcon}
                    alt="Description"
                    width={15}
                    height={15}
                  />
                </IconsContainer>
              </ResetContainer>
            </InLineContainer>
          </CardHeader>
          <CardBody isCollapsed={call.isCollapsed}>
            {call.type.startsWith("on_") ? (
              <>
                {call.businessPayload
                  ? displayOnCallData(call)
                  : getOnCallData()}
              </>
            ) : (
              <FormContainer
                onSubmit={handleSubmit((data) => {
                  sendRequest(data, call);
                })}
              >
                {inputField[call.config].map((item) => (
                  <RenderInput
                    data={{
                      ...item,
                      config: call.config,
                      currentConfig: currentConfig,
                      defaultValue:
                        call?.businessPayload?.[item.key] || item.defaultValue,
                      businessPayload:
                        protocolCalls[call.config].unsolicited
                          ?.businessPayload ||
                        protocolCalls[call.preRequest]?.businessPayload,
                      session: session,
                    }}
                    control={control}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    storeDefaultValue={storeDefaultValue}
                  />
                ))}
              </FormContainer>
            )}
          </CardBody>
          {!call.type.startsWith("on_") && (
            <ButtonContainer>
              <SendButton
                disabled={!call?.becknPayload || call.type === "form"}
                onClick={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify(call.becknPayload, null, 2)
                  );
                  toast.success("Payload copied!");
                }}
              >
                Copy Beckn Payload
              </SendButton>
              {!call.executed && (
                <SendButton
                  disabled={isLoading || !checkFormFields(call.config)}
                  type="submit"
                  onClick={() => handleSend(call)}
                >
                  {call.type === "form" ? "Continue" : "Send"}
                </SendButton>
              )}
            </ButtonContainer>
          )}
        </CallContainer>
      </>
    );
  }
  const pairRenderRequestContainer = (call, inputFieldsData, index) => {
    const nextCall = protocolCalls[call.nextRequest];
    return (
      <Step key={call.config} connector={<QontoConnector />} active={true}>
        <StepLabel>{call.config}</StepLabel>
        <StepContent>
          <PairHeader>
            <HeadingWrapper>{call.config}</HeadingWrapper>
          </PairHeader>
          <div
            style={{
              border: "1px solid #676767",
              padding: "10px",
              borderRadius: "0px 0px 5px 5px",
              boxShadow: "0 0 10px #ccc",
            }}
          >
            <RequestCard call={call} inputField={inputFieldsData} />
            {call.type !== "form" &&
              nextCall !== "null" &&
              nextCall?.shouldRender && (
                <RequestCard call={nextCall} inputField={inputFieldsData} />
              )}
          </div>
        </StepContent>
      </Step>
    );
  };
  let activeStep = 0;
  const steps = Object.entries(protocolCalls).flatMap((data) => {
    const [key, call] = data;
    return { label: call.config };
  });
  const entries = Object.entries(protocolCalls);
  for (let i = 0; i < steps.length; i++) {
    if (entries[i][1].shouldRender) {
      activeStep = i;
    }
  }

  let additionalFlowActiveStep = -1;
  if (session?.additionalFlowConfig) {
    const additionalFlowProtocolCalls =
      session.additionalFlowConfig.protocolCalls;

    const addFlowsteps = Object.entries(additionalFlowProtocolCalls).flatMap(
      (data) => {
        const [key, call] = data;
        return { label: call.config };
      }
    );

    const addFlowEntries = Object.entries(additionalFlowProtocolCalls);
    for (let i = 0; i < addFlowsteps.length; i++) {
      if (addFlowEntries[i][1].shouldRender) {
        additionalFlowActiveStep = i;
      }
    }
  }
  return (
    <>
      <Wrapper>
        <TitleContainer>
          <TitleHeading>
            <img
              onClick={handleBack}
              src={BackIcon}
              alt="Description"
              width={15}
              height={15}
            />
            <h2>{session?.summary}</h2>
          </TitleHeading>
          <TitleInfo>
            <div>
              <p>Transaction ID :</p>
              <small>{transactionId}</small>
            </div>
            <div>
              <p>Domain :</p>
              <small>{session?.domain}</small>
            </div>
            <div>
              <p>Versoin :</p>
              <small>{session?.version}</small>
            </div>
            <div>
              <p>Country :</p>
              <small>{session?.cityCode}</small>
            </div>
            <div>
              <p>City :</p>
              <small>{session?.country}</small>
            </div>
          </TitleInfo>
        </TitleContainer>

        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {/* <VerticalLinearStepper protocolCalls={protocolCalls} /> */}
          <div style={{ width: "100%" }}>
            <Box>
              <Stepper
                orientation="vertical"
                activeStep={activeStep}
                connector={<QontoConnector />}
              >
                {Object.entries(protocolCalls).flatMap((data, index) => {
                  const [key, call] = data;
                  console.log(call.config, checkFormFields(call.config));
                  if (
                    !call.shouldRender ||
                    (call.config.startsWith("on_") && !call.unsolicited?.length)
                  ) {
                    return <></>;
                  }

                  if (call.shouldRender && call.unsolicited?.length) {
                    return [
                      call.unsolicited.map((unsCall) =>
                        renderRequestContainer(unsCall, inputFieldsData, index)
                      ),
                      pairRenderRequestContainer(call, inputFieldsData, index),
                    ];
                  }

                  if (call.shouldRender) {
                    return pairRenderRequestContainer(
                      call,
                      inputFieldsData,
                      index
                    );
                  }
                  return (
                    <Step key={index}>
                      <StepLabel>{call.config}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Box>
            {session?.additionalFlowConfig && (
              <Box style={{ marginTop: "10px" }}>
                <SecondaryTitleHeading>
                  <h2>{session.additionalFlowConfig.summary}</h2>
                </SecondaryTitleHeading>

                <Stepper
                  orientation="vertical"
                  activeStep={additionalFlowActiveStep}
                  connector={<QontoConnector />}
                >
                  {Object.entries(
                    session.additionalFlowConfig.protocolCalls
                  ).flatMap((data, index) => {
                    const [key, call] = data;

                    if (call.shouldRender && call.unsolicited?.length) {
                      return [
                        call.unsolicited.map((unsCall) =>
                          renderRequestContainer(
                            unsCall,
                            session.additionalFlowConfig.input
                          )
                        ),
                        renderRequestContainer(
                          call,
                          session.additionalFlowConfig.input
                        ),
                      ];
                    }

                    if (call.shouldRender) {
                      return renderRequestContainer(
                        call,
                        session.additionalFlowConfig.input
                      );
                    }
                    return (
                      <Step key={index}>
                        <StepLabel>{call.config}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Box>
            )}
            {showAddRequestButton && <>Add Request</>}
          </div>
        </div>
      </Wrapper>
      <GenericModal
        open={modalOpen}
        setOpen={setModalOpen}
        title={selectedConfig}
      >
        <JourneyDisplay
          selectedID={transactionId}
          defaultOpen={selectedConfig}
        />
      </GenericModal>
    </>
  );
};

// function GetCollapsedState(call) {}

export default RequestExecuter;
