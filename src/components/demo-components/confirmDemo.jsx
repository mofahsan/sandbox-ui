import Select from "react-select";
import AccordionUsage from "./Accordian";
import QRCode from "react-qr-code";
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
  if (sessionData.on_init.executed) {
    setCurrentAPI((s) => {
      return {
        ...s,
        payload: setPayload(s.payload),
      };
    });
  }
  return (
    <>
      <AccordionUsage title={"confirm"}>
        <div className="pizza">
          <h2>Audit and Confirm Payment</h2>
          <p>From A to B</p>
          <p>Ticket Type: Single Round Joureny</p>
          <p>Quantity: 3</p>
          <p>Total Price : Rs. 300</p>
          <h2>Make Payment To:-</h2>
          <p>
            bank_code: "XXXXXXXX", bank_account_number: "xxxxxxxxxxxxxx",
            virtual_payment_address: "9988199772@okicic"
          </p>
          <Select options={data} />
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
