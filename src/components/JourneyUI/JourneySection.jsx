import * as React from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { env } from "../../env/env";
import { toast } from "react-toastify";
import { JourneyDisplay } from "./JourneyDisplay";
import { Container } from "../../styled/requestExecuter.style";

export function JourneySection({ containerName }) {
  const [transcations, setTransactions] = React.useState([]);

  React.useEffect(() => {
    getSessions();
  }, [containerName]);

  const getSessions = async () => {
    try {
      const header = {};
      header.headers = {
        ...header.headers,
        "Content-Type": "application/json",
      };
      const res = await axios.get(`${env.sandBox}/cache`, header);
      // setTransactions(res.data);
      // console.log(res.data);
      const ids = res.data
        .filter((s) => {
          return s.startsWith("jm_");
        })
        .map((i) => i.substring(3));
      setTransactions(ids);
    } catch (e) {
      console.log("Error while fetching session data", e);
      toast.error(JSON.stringify(e.response?.data));
    }
  };

  const [CurrentId, setCurrentId] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrentId(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <Container>
      {MakeDropDown(CurrentId, handleChange, transcations)}
      <JourneyDisplay selectedID={CurrentId} />
    </Container>
  );
}

function MakeDropDown(CurrentId, handleChange, transcations) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  return (
    <div style={{ width: "100%" }}>
      <FormControl sx={{ m: 1, width: "100%", paddingRight: "15px" }}>
        <InputLabel id="demo-multiple-name-label">Transaction Id</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={CurrentId}
          onChange={handleChange}
          input={<OutlinedInput label="Transaction Id" />}
          MenuProps={MenuProps}
        >
          {transcations.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
