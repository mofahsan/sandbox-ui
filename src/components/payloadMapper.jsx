import { useState } from "react";
import SessionForm from "./sessionForm";
import RequestExecuter from "./requestExecuter";

import { Container } from "../styled/payloadMapper.style";

const PayloadMapper = () => {
  const [step, setStep] = useState(1);
  const [transactionId, setTranscationId] = useState("");

  const getStep = (currentStep) => {
    if (currentStep === 1) {
      return (
        <SessionForm
          updateStep={(nextStep, transaction_id) => {
            setStep(nextStep);
            setTranscationId(transaction_id);
          }}
        />
      );
    }

    if (currentStep === 2) {
      return (
        <RequestExecuter
          transactionId={transactionId}
          handleBack={() => setStep(1)}
        />
      );
    }
  };

  return <Container>{getStep(step)}</Container>;
};

export default PayloadMapper;
