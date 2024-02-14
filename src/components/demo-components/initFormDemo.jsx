import styled from "styled-components";
import { useEffect, useState } from "react";
import AccordionUsage from "./Accordian";
export default function SendInitForm({ sessionData, setCurrentAPI, children }) {
  //   const onClick = () => {};
  const [name, SetName] = useState("Jhon Doe");
  const [email, setEmail] = useState("jhon@email.com");
  const [phone, setPhone] = useState("8888888888");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setCurrentAPI((p) => {
      return { ...p, payload: payload(p.payload) };
    });
  }, [name, email, phone]);

  const payload = (e) => {
    return {
      ...e,
      name: name,
      email: email,
      phone: phone,
      collectedBy: "BAP",
      paymentStatus: "NOT-PAID",
      paymentType: "PRE-ORDER",
      bankCode: "XXXXXXX",
      bankAccountNumber: "xxxxxxxx",
      virtualPaymentAddress: "9393922@kic",
      paymentsTags: {
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
  };

  const formStyle = {
    width: 400,
    // display: "flex" /* Make parent a flex-container */,
    // justifyContent: "center" /* Centers child horizontally */,
    // alignItems: "" /* Centers child vertically */,
  };
  let totalAmount = "Loading...";
  console.log(sessionData);
  if (sessionData.on_select.executed) {
    totalAmount =
      sessionData.on_select.becknPayload[0].message.order.quote.breakup[0].price
        .value + " INR";
  }
  return (
    <>
      <AccordionUsage title={"init"}>
        <h2>Enter Details</h2>
        <form onSubmit={handleSubmit}>
          <label>Enter Name</label>
          <p style={{ marginTop: "20px" }}>
            Total Amount is <b>{totalAmount}</b>
          </p>
        </form>
        {children}
      </AccordionUsage>
    </>
  );
}

function DetailInfo({ info, statVar, setStatVar }) {
  const Input = styled.input`
    // color: #ed4b4b;
    // font-size: 1.4em;
    // border: 1px solid #ccc;
    // border-radius: 3px;
    // /* here we use the dynamically computed prop */
    // margin: 5px;
    // padding: 3px;
  `;
  return (
    <>
      {/* <div className="selectorDiv"> */}
      {/* <label>{info}</label> */}
      {/* <input
          style={{
            fontSize: "1.2em",
            border: "1px solid #ccc",
            margin: "5px",
          }}
          placeholder={statVar}
          value={statVar}
          onChange={(e) => {
            setStatVar(e.target.value);
          }}
        /> */}
      {/* </div> */}
    </>
  );
}
