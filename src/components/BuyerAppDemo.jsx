import { Container } from "../styled/buyerDemo.style";
import React, { useEffect, useState } from "react";
import AccordionUsage from "./demo-components/Accordian";
import Select from "react-select";
import ReactLoading from "react-loading";
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
        sessionData={sessionData}
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    function CheckLoading(sessionData) {
      for (let c in sessionData) {
        const call = sessionData[c];
        // console.log(call);
        if (!call.type.startsWith("on") || !call.shouldRender) continue;
        if (!call.executed) {
          setLoading(true);
          return;
        }
      }
      setLoading(false);
    }
    CheckLoading(sessionData);
  }, [sessionData]); // checks loading

  return (
    <>
      {loading && currentAPI.index === 0 ? (
        <LoadingIcon />
      ) : (
        <SearchRouteMenu
          sessionData={sessionData}
          currentAPI={currentAPI}
          setCurrentAPI={setCurrentAPI}
        />
      )}

      {loading && currentAPI.index === 1 ? (
        <LoadingIcon />
      ) : (
        currentAPI.index >= 1 && (
          <OnSearchPageMenu
            sessionData={sessionData}
            setCurrentAPI={setCurrentAPI}
          >
            <MakeMarkovChart
              data={currentAPI.index >= 2 ? select_data : []}
              sessionData={sessionData}
            />
          </OnSearchPageMenu>
        )
      )}

      {loading && currentAPI.index === 2 ? (
        <LoadingIcon />
      ) : (
        currentAPI.index >= 2 && (
          <SendInitForm sessionData={sessionData} setCurrentAPI={setCurrentAPI}>
            <MakeMarkovChart
              data={currentAPI.index >= 3 ? init_data : []}
              sessionData={sessionData}
            />
          </SendInitForm>
        )
      )}
      {loading && currentAPI.index === 3 ? (
        <LoadingIcon />
      ) : (
        currentAPI.index >= 3 && (
          <OnInitInfo
            sessionData={sessionData}
            currentAPI={currentAPI}
            setCurrentAPI={setCurrentAPI}
          >
            <MakeMarkovChart
              data={currentAPI >= 4 ? confirm_data : []}
              sessionData={sessionData}
            />
          </OnInitInfo>
        )
      )}
      {loading && currentAPI.index === 4 ? (
        <LoadingIcon />
      ) : (
        currentAPI.index >= 4 && <OnConfirmInfo />
      )}
    </>
  );
}

function LoadingIcon() {
  return (
    <div style={{ marginTop: "10px" }}>
      <ReactLoading type="spin" height={50} width={50} color="red" />
    </div>
  );
}

function SearchRouteMenu({ sessionData, currentAPI, setCurrentAPI }) {
  const selectStart = (e) => {
    const beckn = sessionData.on_search_route.becknPayload.filter(
      (b) => b.message.catalog.descriptor.name === "Transit Solutions"
    )[0];
    const on_search = beckn.context;
    const uri = on_search.bpp_uri;
    const id = on_search.bpp_id;
    const payload = {
      ...currentAPI.payload,
      bpp_uri: uri,
      bpp_id: id,
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
  if (Object.keys(sessionData).length <= 0) return <h2>Start A Session</h2>;

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
        sessionData={sessionData}
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
    const beckn = sessionData.on_search_route.becknPayload.filter(
      (b) => b.message.catalog.descriptor.name === "Transit Solutions"
    )[0];
    const catalog = beckn.message;
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
