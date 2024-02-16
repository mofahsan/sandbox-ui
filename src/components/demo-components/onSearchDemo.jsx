import { useEffect, useState } from "react";
import Select from "react-select";
import AccordionUsage from "./Accordian";
// import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";

function OnSearchPageMenu({ sessionData, setCurrentAPI, children }) {
  const ticketLimit = 6;
  const [inputData, setInputData] = useState({ id: "I2", q: 1 });
  const [price, SetPrice] = useState("-");
  let tickets_data = [];
  useEffect(() => {
    const payload = (e) => {
      const on_search = sessionData.on_search_route.becknPayload[0].context;
      const uri = on_search.bpp_uri;
      const id = on_search.bpp_id;
      return {
        ...e,
        bpp_uri: uri,
        bpp_id: id,
        providerId: "P1",
        itemId: inputData.id, //inputData.id,
        quantity: inputData.q,
      };
    };
    setCurrentAPI((s) => {
      return { ...s, payload: payload(s.payload) };
    });
  }, [inputData, setCurrentAPI, sessionData]);
  if (sessionData.on_search_trip.executed) {
    const items =
      sessionData.on_search_trip.becknPayload[0].message.catalog.providers[0]
        .items;
    tickets_data = items.map((i) => {
      return { name: i.descriptor.name, code: i.id, price: i.price.value };
    });
  }

  const SetTicketsOptions = tickets_data.map((t) => {
    return { value: t.code, label: t.name };
  });

  const inc = () =>
    setInputData((s) => {
      return { ...s, q: Math.min(ticketLimit, s.q + 1) };
    });

  const dec = () =>
    setInputData((s) => {
      return { ...s, q: Math.max(1, s.q - 1) };
    });

  const style = {
    display: "inline-block",
    width: "100%",
    marginTop: "10px",
  };
  return (
    <>
      <AccordionUsage title={"select"}>
        <div selectorDiv>
          <label>Select Ticket Type:</label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            options={SetTicketsOptions}
            // getOptionLabel={(label) => console.log(label)}
            onChange={(value, label) => {
              const l = value.label;
              const p = tickets_data.find((f) => f.name === l).price;
              SetPrice(p);
              console.log(value.value);
              setInputData((d) => {
                return { ...d, id: value.value };
              });
            }}
          />
          <p style={style}>
            Ticket Price: <b>Rs.{price}</b>
          </p>
          <div style={style}>
            <IconButton size="small" color="error" onClick={dec}>
              <RemoveIcon />
            </IconButton>
            <message style={{ padding: "10px" }}>{inputData.q}</message>
            <IconButton size="small" color="error" onClick={inc}>
              <AddIcon />
            </IconButton>
          </div>
        </div>
        {children}
      </AccordionUsage>
    </>
  );
}

export default OnSearchPageMenu;
