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
    sendRequest(currentAPI, setSessionData);
    RequestTwice(currentAPI, setSessionData);
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

function GetConfig(index) {
  if (index === 0) return "search_trip";
  else if (index === 1) return "select";
  else if (index === 2) return "init";
  else if (index === 3) return "confirm";
}
let done = false;
function RequestTwice(currentAPI, setSessionData) {
  let a = 0;
  const call = setTimeout(() => {
    if (a >= 2 || done) {
      clearTimeout(call);
      return;
    }
    getSession(currentAPI, setSessionData);
    done = false;
    a += 1;
  }, 3000);
}
const getSession = async (currentAPI, setSessionData, call) => {
  console.log("hello");
  try {
    const header = {};
    header.headers = {
      ...header.headers,
      "Content-Type": "application/json",
    };
    const res = await axios.get(
      `${env.sandBox}/cache?transactionid=jm_${currentAPI.transactionId}`,
      header
    );
    setSessionData(res.data.protocolCalls);
    done = true;
  } catch (e) {
    console.log("Error while fetching session data", e);
    toast.error(JSON.stringify(e.response.data));
  }
};

// message.catalog.providers[].items[].add_ons[]{desc:descriptor.short_desc}
// message.catalog.providers[].items[].add_ons[]{@:price}

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
