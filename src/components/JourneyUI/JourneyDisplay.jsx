import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { CircularProgress, StepButton } from "@mui/material";
import { DisplayFlow } from "./Flow/DisplayFlow";
import axios from "axios";
import { toast } from "react-toastify";
import { env } from "../../env/env";
import { useState } from "react";
import { set } from "react-hook-form";

export function JourneyDisplay({ selectedID, defaultOpen = null }) {
  const SIDE_NAV_WIDTH = 0;
  const [protocolCalls, setProtocolCalls] = useState({});
  const [flowConfig, setFlowConfig] = useState(defaultOpen);
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    getSession();
  }, [selectedID]);

  const getSession = async () => {
    setLoading(true);
    try {
      const header = {};
      header.headers = {
        ...header.headers,
        "Content-Type": "application/json",
      };
      const res = await axios.get(
        `${env.sandBox}/cache?transactionid=jm_${selectedID}`,
        header
      );
      setProtocolCalls(res.data.protocolCalls);
      setLoading(false);
    } catch (e) {
      console.log("Error while fetching session data", e);
      toast.error(JSON.stringify(e?.response));
      setLoading(false);
    }
  };
  const LayoutRoot = styled("div")(({ theme }) => ({
    display: "flex",
    flex: "1 1 auto",
    // maxWidth: "100%",
    minWidth: "100%",
    minHeight: "500px",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: SIDE_NAV_WIDTH,
    },
  }));
  const LayoutContainer = styled("div")({
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  });

  if (loading)
    return (
      <>
        <CircularProgress />
      </>
    );
  // console.log("HELLO", protocolCalls);
  return (
    <LayoutRoot>
      <LayoutContainer>
        <HorizontalStepperWithError
          protocolCalls={protocolCalls}
          setFlowConfig={setFlowConfig}
        />
        <DisplayFlow
          protocolCalls={protocolCalls}
          config={flowConfig}
          transactionId={selectedID}
          getSession={getSession}
        />
        {/* <RightDrawer /> */}
      </LayoutContainer>
    </LayoutRoot>
  );
}

export default function HorizontalStepperWithError({
  protocolCalls,
  setFlowConfig,
}) {
  function GetCallSteps() {
    if (!protocolCalls) return null;
    // console.log(protocolCalls);
    return Object.entries(protocolCalls)
      .filter((data) => {
        // console.log(data);
        console.log(data);
        return !data[0].startsWith("on_") && data[1].type !== "form";
      })
      .map((data, i) => {
        const labelProps = {};
        if (CheckFailed(protocolCalls, data[0])) {
          labelProps.optional = (
            <Typography variant="caption" color="error">
              NACK!
            </Typography>
          );
          labelProps.error = true;
        }
        return (
          <Step key={data[0]}>
            <StepButton
              color="inherit"
              onClick={() => {
                setFlowConfig(data[0]);
              }}
            >
              <StepLabel {...labelProps}>{data[0]}</StepLabel>
            </StepButton>
          </Step>
        );
      });
  }
  //   GetCurrentStep(protocolCalls);
  return (
    <Box
      sx={{
        width: "80%",
        height: "50px",
        marginTop: "5px",
        overflowX: "auto",
        overflowY: "hidden",
        "&::-webkit-scrollbar": {
          height: "7px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}
    >
      <Stepper activeStep={GetCurrentStep(protocolCalls)}>
        {GetCallSteps()}
      </Stepper>
    </Box>
  );
}

export function GetCurrentStep(protocolCalls) {
  let step = 0;
  for (let key in protocolCalls) {
    if (key.startsWith("on_")) continue;
    if (protocolCalls[key].executed) step += 1;
    else break;
  }
  //   console.log(step);
  return step;
}

function CheckFailed(protocolCalls, config) {
  if (protocolCalls[config].hasOwnProperty("becknResponse")) {
    if (protocolCalls[config].becknResponse.hasOwnProperty("error"))
      return true;
  }
  //   console.log(protocolCalls[config]);
  return false;
}
