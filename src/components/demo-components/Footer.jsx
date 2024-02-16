import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { DemoSessionData } from "../DemoSessionData";
import { apiList } from "../BuyerAppDemo";
import axios from "axios";
import { toast } from "react-toastify";
import { env } from "../../env/env";

export function Footer({
  currentAPI,
  sessionData,
  setCurrentAPI,
  setSessionData,
}) {
  const onClick = () => {
    if (currentAPI >= 4) return;
    setCurrentAPI((s) => ({ ...s, index: s.index + 1 }));
    sendRequest(currentAPI, setSessionData);
    // RequestTwice(currentAPI, setSessionData);
  };

  // useEffect(() => {
  //   sendRequest(currentAPI, setSessionData);
  // }, [currentAPI, setSessionData]);

  return (
    <footer className="footer" style={{ display: "flex" }}>
      {Object.keys(sessionData).length > 0 && (
        <div className="order">{ContinueSessionBtn(onClick, currentAPI)}</div>
      )}
      <DemoSessionData
        setCurrentAPI={setCurrentAPI}
        setSessionData={setSessionData}
        sessionData={sessionData}
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

function GetConfig(index) {
  if (index === 0) return "search_trip";
  else if (index === 1) return "select";
  else if (index === 2) return "init";
  else if (index === 3) return "confirm";
}

// let done = false;
// function RequestTwice(currentAPI, setSessionData) {
//   let a = 0;
//   const call = setTimeout(() => {
//     if (a >= 2 || done) {
//       clearTimeout(call);
//       return;
//     }
//     getSession(currentAPI, setSessionData);
//     done = false;
//     a += 1;
//   }, 3000);
// }

const sendRequest = async (currentAPI, setSessionData) => {
  try {
    console.log("sending");
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
