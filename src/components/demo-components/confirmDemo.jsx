import Select from "react-select";
import AccordionUsage from "./Accordian";
import QRCode from "react-qr-code";
import { v4 as uuidv4 } from "uuid";
export function OnInitInfo({
  currentAPI,
  setCurrentAPI,
  sessionData,
  children,
}) {
  const data = [
    { value: "S1", label: "PAID" },
    { value: "S2", label: "NOT PAID" },
  ];
  // console.log(sessionData);

  const setPayload = (e) => {
    return {
      ...e,
      paymentId: "PA1",
      collectedBy: "BAP",
      paymentStatus: "PAID",
      paymentType: "PRE-ORDER",
      transcationId: currentAPI.transactionId,
      amount: 120,
      currency: "INR",
      paymentTags: {
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

  function handleChange(e) {
    // console.log(sessionData);
    console.log(e);
    setCurrentAPI((s) => {
      return {
        ...s,
        payload: setPayload(s.payload),
      };
    });
  }

  const fillData = {
    start: sessionData.search_trip.businessPayload.startStop,
    end: sessionData.search_trip.businessPayload.endStop,
    type: sessionData.select.businessPayload.itemId,
    q: sessionData.select.businessPayload.quantity,
  };

  return (
    <>
      <AccordionUsage title={"confirm"}>
        <div className="pizza">
          <h2>Audit and Confirm Payment</h2>
          <p>
            From {fillData.start} to {fillData.end}
          </p>
          <p>Ticket Type: {fillData.type}</p>
          <p>Quantity: {fillData.q}</p>
          <p>Total Price : Rs. 120</p>
          <h2>Make Payment To:-</h2>
          <p>
            bank_code: "XXXXXXXX", bank_account_number: "xxxxxxxxxxxxxx",
            virtual_payment_address: "9988199772@okicic"
          </p>
          <Select options={data} onChange={handleChange} />
        </div>
        {children}
      </AccordionUsage>
    </>
  );
}

export function OnConfirmInfo() {
  return (
    <>
      <AccordionUsage title={"on_confirm"}>
        <h2>Ticket Confirmed!</h2>
        {/* <h5>Have a safe Joureny!</h5> */}
        <QRCode
          value="Enter ticket token Here"
          style={{ height: "100px", width: "100px" }}
        />
        <em style={{ margin: "10px" }}>Scan the QR at the Station</em>
      </AccordionUsage>
    </>
  );
}
