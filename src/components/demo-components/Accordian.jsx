import * as React from "react";
import Accordion from "@mui/material/Accordion";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
// import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useState } from "react";
import Button from "@mui/material/Button";

export default function AccordionUsage({ title, showV = true, children }) {
  const [expanded, setExpanded] = useState(true);
  //   localStorage.getItem(`expandedItem${title}`)
  //       ? ConvStringToBool(localStorage.getItem(`expandedItem${title}`))
  //       : true
  const handleChange = () => {
    setExpanded((prev) => !prev);
    // localStorage.setItem(`expandedItem${title}`, !expanded);
    // let x = localStorage.getItem(`expandedItem${title}`);
  };
  return (
    <>
      <div className="block" style={{ marginTop: "20px" }}>
        {showV ? (
          <Button className="btn-small" variant="outlined" color="error">
            <DeviceHubIcon />
          </Button>
        ) : null}
        <Accordion
          defaultExpanded={expanded}
          expanded={expanded}
          onChange={() => handleChange()}
          style={{
            backgroundColor: "hsl(0, 0%, 95%)",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {title}
          </AccordionSummary>
          <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}

// const ConvStringToBool = (string) => string === "true";
