import { Container } from "../styled/buyerDemo.style";
import React, { useState } from "react";
import AccordionUsage from "./demo-components/Accordian";
import Select from "react-select";

import OnSearchPageMenu from "./demo-components/onSearchDemo";
import SendInitForm from "./demo-components/initFormDemo";
import { OnInitInfo, OnConfirmInfo } from "./demo-components/confirmDemo";
import MakeMarkovChart from "./demo-components/d3-visualization/MakeMarkovChart";

import { Footer } from "./demo-components/Footer";

export const apiList = ["search", "select", "init", "confirm", "complete"];

let sessionCalls = [];

export function BuyerAppDemo() {
  const [currentAPI, setCurrentAPI] = useState({ index: 0, payload: {} });
  const [sessionData, setSessionData] = useState({});
  return (
    <Container>
      <Header />
      <Menu
        currentAPI={currentAPI}
        sessionData={sessionData}
        setCurrentAPI={setCurrentAPI}
      />
      <Footer
        currentAPI={currentAPI}
        setCurrentAPI={setCurrentAPI}
        setSessionData={setSessionData}
      />
    </Container>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Metro Buying App Demo</h1>
    </header>
  );
}

function Menu({ currentAPI, sessionData, setCurrentAPI }) {
  return (
    <>
      <main className="menu">
        <Demo
          currentAPI={currentAPI}
          sessionData={sessionData}
          setCurrentAPI={setCurrentAPI}
        />
      </main>
    </>
  );
}

function Demo({ currentAPI, sessionData, setCurrentAPI }) {
  return (
    <>
      {SearchRouteMenu(sessionData, currentAPI, setCurrentAPI)}
      {currentAPI.index >= 1 && (
        <OnSearchPageMenu
          sessionData={sessionData}
          setCurrentAPI={setCurrentAPI}
        >
          <MakeMarkovChart
            data={currentAPI.index >= 2 ? select_data : []}
            payloads={["hello"]}
          />
        </OnSearchPageMenu>
      )}
      {currentAPI.index >= 2 && (
        <SendInitForm sessionData={sessionData} setCurrentAPI={setCurrentAPI}>
          <MakeMarkovChart
            data={currentAPI.index >= 3 ? init_data : []}
            payloads={["hello"]}
          />
        </SendInitForm>
      )}
      {currentAPI.index >= 3 && (
        <OnInitInfo
          sessionData={sessionData}
          currentAPI={currentAPI}
          setCurrentAPI={setCurrentAPI}
        >
          <MakeMarkovChart
            data={currentAPI >= 4 ? confirm_data : []}
            payloads={["hello"]}
          />
        </OnInitInfo>
      )}
      {currentAPI.index >= 4 && <OnConfirmInfo />}
    </>
  );
}

function SearchRouteMenu(sessionData, currentAPI, setCurrentAPI) {
  const selectStart = (e) => {
    const payload = {
      ...currentAPI.payload,
      bpp_uri: "https://mobility-staging.ondc.org/seller/",
      bpp_id: "mobility-staging.ondc.org",
      startStop: e.label,
    };
    setCurrentAPI((s) => ({ ...s, payload }));
  };
  const selectEnd = (e) => {
    const payload = {
      ...currentAPI.payload,
      endStop: e.label,
    };
    setCurrentAPI((s) => ({ ...s, payload }));
  };
  return (
    <AccordionUsage title={"search"}>
      <h2>Select Start and End Locations</h2>
      <StationDropDownMenu
        description={"Select Start Station:"}
        sessionData={sessionData}
        onChange={(e) => selectStart(e)}
      />
      <StationDropDownMenu
        description={"Select End Station:"}
        sessionData={sessionData}
        onChange={(e) => selectEnd(e)}
      />
      <MakeMarkovChart
        data={currentAPI.index >= 1 ? search_data : []}
        payloads={["hello"]}
      />
    </AccordionUsage>
  );
}

function StationDropDownMenu({ description, sessionData, onChange = null }) {
  let options = [
    { value: "S1", label: "Shaheed Sthal" },
    { value: "S2", label: "Hindon River" },
    { value: "S3", label: "Arthala" },
  ];
  // console.log(sessionData);
  if (!sessionData.on_search_route?.executed) {
    options = [];
  } else {
    const catalog = sessionData.on_search_route?.becknPayload.at(1).message;
    const stops = catalog.catalog.providers.at(0).fulfillments.at(0).stops;
    options = stops.map((s) => {
      return { value: s.id, label: s.location.descriptor.code };
    });
  }
  return (
    <>
      <div className="selectorDiv">
        <label>{description}</label>
        <Select
          className="basic-single"
          classNamePrefix="select"
          options={options}
          onChange={onChange}
        />
      </div>
    </>
  );
}

function CreateBasePayload(index) {
  if (index === 0)
    return {
      bpp_uri: "https://mobility-staging.ondc.org/seller/",
      bpp_id: "mobility-staging.ondc.org",
      startStop: "",
      endStop: "",
    };
  if (index === 1) {
    return { itemId: "", quantity: "", providerId: "P1" };
  }
}

const search_data = GenrateNewGraphData([], 0);
const select_data = GenrateNewGraphData([], 1);
const init_data = GenrateNewGraphData([], 2);
const confirm_data = GenrateNewGraphData([], 3);

function GenrateNewGraphData(data, currentAPI) {
  if (currentAPI >= apiList.length) return data;
  const current = apiList[currentAPI];
  const step = 1.5;
  const num = 100 - 4 * step;
  const item1 = {
    BuyerApp: num - 1 * step,
    SellerApp: num - 1 * step,
    country: current,
    arrowStart: false,
  };
  const item2 = {
    BuyerApp: num - 2 * step,
    SellerApp: num - 2 * step,
    country: "ACK",
    arrowStart: true,
  };
  const item3 = {
    BuyerApp: num - 3 * step,
    SellerApp: num - 3 * step,
    country: `on_${current}`,
    arrowStart: true,
  };
  const item4 = {
    BuyerApp: num - 4 * step,
    SellerApp: num - 4 * step,
    country: "ACK",
    arrowStart: false,
  };
  return [...data, item1, item2, item3, item4];
}
