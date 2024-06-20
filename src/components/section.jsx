import { useState } from "react";

import PayloadMapper from "./payloadMapper";
import PayloadMapperSeller from "./payloadMapperSeller"
import { NewRequestDiv, NewRequestbutton } from "../styled/section";
import { JourneySection } from "./JourneyUI/JourneySection";

function Section() {
  const [newRequestContainer, setRequestContainer] = useState("PayloadMapper");

  return (
    <div className="container">
      <NewRequestDiv>
        <NewRequestbutton
          onClick={() => {
            setRequestContainer("PayloadMapper");
          }}
          active={newRequestContainer === "PayloadMapper"}
        >
          Buyer Mock
        </NewRequestbutton>
        <NewRequestbutton
          onClick={() => {
            setRequestContainer("PayloadMapperSeller");
          }}
          active={newRequestContainer === "PayloadMapperSeller"}
        >
          Seller Mock
        </NewRequestbutton>
        <NewRequestbutton
          onClick={() => {
            setRequestContainer("JourneySection");
          }}
          active={newRequestContainer === "JourneySection"}
        >
          Request Flow
        </NewRequestbutton>
      </NewRequestDiv>

      <div
        style={{
          display: newRequestContainer === "PayloadMapper"  ? "block" : "none",
        }}
      >
        <PayloadMapper />
      </div>
      <div
        style={{
          display: newRequestContainer === "JourneySection" ? "block" : "none",
        }}
      >
        <JourneySection containerName={newRequestContainer} />
      </div>
      <div
        style={{
          display: newRequestContainer === "PayloadMapperSeller" ? "block" : "none",
        }}
      >
        <PayloadMapperSeller containerName={newRequestContainer} />
      </div>
    </div>
  );
}

export default Section;
