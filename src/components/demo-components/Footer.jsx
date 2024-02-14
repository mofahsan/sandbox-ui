import React from "react";
import Button from "@mui/material/Button";
import { DemoSessionData } from "../DemoSessionData";
import { apiList } from "../BuyerAppDemo";
import axios from "axios";
import { toast } from "react-toastify";
import { env } from "../../env/env";

export function Footer({
  currentAPI,
  setCurrentAPI,
  setSessionData,
  payloadData,
}) {
  const onClick = () => {
    if (currentAPI >= 4) return;
    setCurrentAPI((s) => ({ ...s, index: s.index + 1 }));
    // sendRequest(currentAPI, setSessionData);
  };

  return (
    <footer className="footer" style={{ display: "flex" }}>
      <div className="order">{ContinueSessionBtn(onClick, currentAPI)}</div>
      <DemoSessionData
        setCurrentAPI={setCurrentAPI}
        setSessionData={setSessionData}
      />
    </footer>
  );
}
function ContinueSessionBtn(onClick, currentAPI) {
  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={onClick}
        style={{ marginTop: "10px", textTransform: "none" }}
      >
        {currentAPI.index >= 4 ? "complete" : apiList[currentAPI.index]}
      </Button>
    </>
  );
}

function GetPayloadData(index) {
  if (index === 0)
    return {
      bpp_uri: "https://mobility-staging.ondc.org/seller/",
      bpp_id: "mobility-staging.ondc.org",
      startStop: "",
      endStop: "",
    };
}

function GetConfig(index) {
  if (index === 0) return "search_trip";
  else if (index === 1) return "select";
  else if (index === 2) return "init";
  else if (index === 3) return "confirm";
}
const sendRequest = async (currentAPI, setSessionData) => {
  // console.log(data);
  try {
    const header = {};
    header.headers = {
      ...header.headers,
      "Content-Type": "application/json",
    };

    const res = await axios.post(
      `${env.sandBox}/mapper/${GetConfig(currentAPI.index)}`,
      JSON.stringify({
        transactionId: currentAPI.transactionId,
        payload: currentAPI.payload,
      }),
      header
    );
    console.log(res);
    setSessionData(res.data.session.protocolCalls);
  } catch (e) {
    console.log("Error while fetching session data", e);
    toast.error(JSON.stringify(e.response.data));
  }
};
