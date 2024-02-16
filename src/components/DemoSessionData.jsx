import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import { env } from "../env/env";

export function DemoSessionData({
  currentAPI,
  sessionData,
  setCurrentAPI,
  setSessionData,
}) {
  //button which creates a new session and resets demo
  // search for routes
  let transactionId = useRef("");
  const [FetchingSession, setFetchingSession] = useState(false);
  const createSession = () => {
    setCurrentAPI({ index: 0, payload: {} });
    transactionId.current = uuidv4();
    initSession();
  };

  // gets session when required
  useEffect(() => {
    const getSession = async () => {
      try {
        console.log("getting");
        if (FetchingSession) return;
        setFetchingSession(true);
        const header = {};
        header.headers = {
          ...header.headers,
          "Content-Type": "application/json",
        };
        const res = await axios.get(
          `${env.sandBox}/cache?transactionid=jm_${transactionId.current}`,
          header
        );
        await setSessionData(res.data.protocolCalls);
        setFetchingSession(false);
      } catch (e) {
        console.log("Error while fetching session data", e);
        toast.error(JSON.stringify(e.response.data));
      }
    };
    const data = sessionData;
    Object.entries(data).map((call) => {
      if (!call[0].startsWith("on") || !call[1].shouldRender) return null;
      if (call[1].executed) return null;
      if (!FetchingSession) {
        setTimeout(() => {
          getSession();
        }, 2000);
      }
      return null;
    });
  }, [sessionData, setSessionData, FetchingSession]);

  const initSession = async (e) => {
    // e.preventDefault();
    const formData = {
      bap_id: "api.example-bap.com",
      bap_uri: "https://api.example-bap.com/ondc/metro",
      domain: "ONDC:TRV11",
      ttl: "PT30S",
      version: "2.0.0",
      country: "IND",
      cityCode: "std:044",
      configName: "metro-flow-1",
    };

    const transactiomId = transactionId.current;

    try {
      const header = {};
      header.headers = {
        ...header.headers,
        "Content-Type": "application/json",
      };

      const x = await axios.post(
        `${env.sandBox}/mapper/session`,
        JSON.stringify({ ...formData, transaction_id: transactiomId }),
        header
      );
      await sendRequest_searchRoute();
    } catch (e) {
      console.log("error while sending session request", e);
      // toast.error(JSON.stringify(e.response.data));
    }
  };

  const sendRequest_searchRoute = async () => {
    // console.log("e", e);
    // console.log("call", call);

    // const data = getData(call.config);
    const data = {
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

    setCurrentAPI((s) => ({
      ...s,
      payload: data,
      transactionId: transactionId.current,
    }));
    // setPayloadData([data]);
    try {
      const header = {};
      header.headers = {
        ...header.headers,
        "Content-Type": "application/json",
      };

      const res = await axios.post(
        `${env.sandBox}/mapper/search_route`,
        JSON.stringify({
          transactionId: transactionId.current,
          payload: data,
        }),
        header
      );
      // console.log(res);
      setSessionData(res.data.session.protocolCalls);
    } catch (e) {
      console.log("Error while fetching session data", e);
      // toast.error(JSON.stringify(e.response.data));
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={createSession}
        style={{ marginTop: "10px", textTransform: "none", marginLeft: "10px" }}
      >
        Create New Session
      </Button>
      {/* <Button onClick={getSession}>Get REs</Button> */}
    </>
  );
}
