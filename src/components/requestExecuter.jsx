import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { env } from "../env/env";
import BackIcon from "../assets/png/back.png";
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
} from "../styled/requestExecuter.style";
import RenderInput from "./renderInput";
import { useEffect } from "react";

const RequestExecuter = ({ transactionId, handleBack }) => {
  const [protocolCalls, setProtocolCalls] = useState({});
  const [inputFieldsData, setInputFieldsData] = useState({});
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getSession();
  }, [transactionId]);

  const getSession = async () => {
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

      console.log("sessionData", res.data);

      setInputFieldsData(res.data.input);
      setProtocolCalls(res.data.protocolCalls);
    } catch (e) {
      console.log("Error while fetching session data", e);
      toast.error(JSON.stringify(e.response.data));
    }
  };

  const toggleCollapse = (call) => {
    setProtocolCalls((prevData) => {
      prevData[call.config] = {
        ...prevData[call.config],
        isCollapsed: !call.isCollapsed,
      };

      return { ...prevData };
    });
  };

  const getData = (type) => {
    if (type === "search_route") {
      return {
        vehicleCategaory: "METRO",
        paymentTagsSearch: {
          BUYER_FINDER_FEES: {
            BUYER_FINDER_FEES_TYPE: "percent-annualized",
            BUYER_FINDER_FEES_PERCENTAGE: "1",
          },
          SETTLEMENT_TERMS: {
            DELAY_INTEREST: 2.5,
            STATIC_TERMS:
              "https://bap.credit.becknprotocol.io/personal-banking/loans/personal-loan",
          },
        },
      };
    }

    if (type === "search_trip") {
      return {
        startStop: "SHAHEED_STHAL",
        endStop: "AZADPUR",
        bpp_id: "api.example-bpp.com",
        bpp_uri: "https://mobility-staging.ondc.org/seller/",
      };
    }

    if (type === "select") {
      return {
        itemId: "I1",
        quantity: 2,
        providerId: "P1",
      };
    }

    if (type === "init") {
      return {
        name: "Hohn Doe",
        email: "hohn.doe@gamil.com",
        phone: "1212312312312",
        collectedBy: "BAP",
        paymentStatus: "NOT-PAID",
        paymentType: "PRE-ORDER",
        bankCode: "XXXXXXXX",
        bankAccountNumber: "xxxxxxxxxxxxxx",
        virtualPaymentAddress: "9988199772@okicic",
        paymentTagsInit: {
          BUYER_FINDER_FEES: {
            BUYER_FINDER_FEES_PERCENTAGE: 1,
          },
          SETTLEMENT_DETAILS: {
            SETTLEMENT_TYPE: "UPI",
          },
          SETTLEMENT_TERMS: {
            SETTLEMENT_AMOUNT: 59,
            SETTLEMENT_TYPE: "neft",
            DELAY_INTEREST: 2.5,
            STATIC_TERMS: "https://api.example-bap.com/booking/terms",
          },
        },
      };
    }

    if (type === "confirm") {
      return {
        paymentId: "PA1",
        collectedByConfirm: "BAP",
        paymentStatusConfirm: "PAID",
        paymentTypeConfirm: "PRE-ORDER",
        paymentTranscationId: "34cc9b0b-6887-4c63-8397-2f4fcf03e50d",
        currency: "INR",
        amount: "120",
        paymentTagsConfirm: {
          BUYER_FINDER_FEES: {
            BUYER_FINDER_FEES_PERCENTAGE: 1,
          },
          SETTLEMENT_TERMS: {
            SETTLEMENT_WINDOW: "PT60M",
            SETTLEMENT_BASIS: "Delivery",
            SETTLEMENT_TYPE: "upi",
            MANDATORY_ARBITRATION: true,
            COURT_JURISDICTION: "New Delhi",
            DELAY_INTEREST: 2.5,
            STATIC_TERMS: "https://www.abc.com/settlement-terms/",
            SETTLEMENT_AMOUNT: 59,
          },
        },
      };
    }

    if (type === "status") {
      return {
        orderId: "077b248f",
      };
    }
  };

  const displayOnCallData = (call) => {
    console.log("call");
    // return call.data.map((item) => {
    return (
      <OnPayloadContainer>
        <ResponseField>{JSON.stringify(call.businessPayload)}</ResponseField>
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
    // });
  };

  const sendRequest = async (e, call) => {
    console.log("e", e);
    console.log("call", call);

    // const data = getData(call.config);
    const data = e;

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

      setProtocolCalls(res.data.session.protocolCalls);
    } catch (e) {
      console.log("Error while fetching session data", e);
      toast.error(JSON.stringify(e.response.data));
    }
  };

  const getOnCallData = () => {
    setTimeout(() => {
      getSession();
    }, 3000);
    return <div>{`Waiting for response`}</div>;
  };

  return (
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
          <h2>TransactionID: {transactionId}</h2>
        </TitleHeading>
      </TitleContainer>

      {Object.entries(protocolCalls).map((data) => {
        const [key, call] = data;

        if (call.shouldRender) {
          return (
            <Container>
              <CardHeader rotation={call.isCollapsed ? 270 : 90}>
                <HeadingWrapper>{call.config}</HeadingWrapper>
                <img
                  onClick={() => toggleCollapse(call)}
                  src={BackIcon}
                  alt="Description"
                  width={10}
                  height={10}
                />
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
                    onSubmit={handleSubmit((data) => sendRequest(data, call))}
                  >
                    {inputFieldsData[call.config].map((item) => (
                      <RenderInput
                        data={{
                          ...item,
                          defaultValue: call?.businessPayload?.[item.key],
                        }}
                        control={control}
                        errors={errors}
                      />
                    ))}
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
                      <SendButton disabled={call.executed} type="submit">
                        Send
                      </SendButton>
                    </ButtonContainer>
                  </FormContainer>
                )}
              </CardBody>
            </Container>
          );
        }
      })}
    </Wrapper>
  );
};

export default RequestExecuter;
