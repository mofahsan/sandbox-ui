import * as d3 from "d3";
import React, { Component, useState } from "react";
import { useEffect, useRef } from "react";
import TransitionsModal from "./ModalUI";

const startLine = "BuyerApp";
const endLine = "SellerApp";

let expandData = { title: "", info: "" };

function Chart({ data, payloads }) {
  const chartRef = useRef(null);
  const prevData = useRef([
    {
      BuyerApp: 70,
      SellerApp: 70,
      country: "API CALLS",
      arrowStart: true,
      dummy: true,
    },
  ]);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (!chartRef.current) return;
    // Specify the chart’s dimensions.
    const width = 700;
    const height = 200;
    const marginTop = 40;
    const marginRight = 50;
    const marginBottom = 10;
    const marginLeft = 50;
    const padding = 5;

    // Prepare the positional scales.
    const x = d3
      .scalePoint()
      .domain([0, 1])
      .range([marginLeft, width - marginRight])
      .padding(0.5);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data.flatMap((d) => [d[startLine], d[endLine]])))
      .range([height - marginBottom, marginTop]);

    const line = d3
      .line()
      .x((d, i) => {
        return x(i);
      })
      .y(y);

    const formatNumber = y.tickFormat(100);

    d3.select(chartRef.current).selectChildren().remove();
    // Create the SVG container.
    const svg = d3
      .select(chartRef.current)
      .attr("viewBox", [0, 0, width, height]);

    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("refX", 6) // X coordinate of the arrowhead relative to the end of the line
      .attr("refY", 3) // Y coordinate of the arrowhead relative to the center of the line
      .attr("markerWidth", 10) // Width of the arrowhead
      .attr("markerHeight", 10) // Height of the arrowhead
      .attr("orient", "auto")
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("d", "M0,0 L0,6 L9,3 z")
      .style("fill", "grey"); // Path of the arrowhead

    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowheadRed")
      .attr("refX", 6) // X coordinate of the arrowhead relative to the end of the line
      .attr("refY", 3) // Y coordinate of the arrowhead relative to the center of the line
      .attr("markerWidth", 10) // Width of the arrowhead
      .attr("markerHeight", 10) // Height of the arrowhead
      .attr("orient", "auto")
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("d", "M0,0 L0,6 L9,3 z")
      .style("fill", "red"); // Path of the arrowhead

    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowheadBlue")
      .attr("refX", 6) // X coordinate of the arrowhead relative to the end of the line
      .attr("refY", 3) // Y coordinate of the arrowhead relative to the center of the line
      .attr("markerWidth", 10) // Width of the arrowhead
      .attr("markerHeight", 10) // Height of the arrowhead
      .attr("orient", "auto")
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("d", "M0,0 L0,6 L9,3 z")
      .style("fill", "Blue");
    // Append the x axis.
    svg
      .append("g")
      .attr("text-anchor", "middle")
      .selectAll("g")
      .data([0, 1])
      .join("g")
      .attr("transform", (i) => `translate(${x(i)},20)`)
      .call((g) => g.append("text").text((i) => (i ? endLine : startLine)))
      .call((g) =>
        g
          .append("line")
          .attr("y1", 10)
          .attr("y2", 300)
          .attr("stroke", "currentColor")
      );
    let totalLength = 500;
    let count = 0;

    // Create a line for each country.
    const l = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .selectAll("path")
      .data(data)
      .join("path")
      .attr("d", (d) => {
        // const l = line([d[startLine], d[endLine]]);
        const l = line([d[startLine], d[endLine]]);
        return l;
      });

    l.attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", (d) => {
        return d.arrowStart ? -totalLength : totalLength;
      })
      .transition()
      .delay(function (d, i) {
        if (prevData.current.includes(d)) return 0;
        count += 1;
        return count * 1500;
      })
      .duration((d, i) => {
        if (prevData.current.includes(d)) return 0;
        return 1800;
      })
      .on("end", (data) => {
        prevData.current = [...prevData.current, data];
      })
      .attr("stroke-dashoffset", 0)
      .attr("stroke", (d) => {
        if (d.country === "ACK") return "grey";
        return d.arrowStart ? "blue" : "red";
      })
      .attr("marker-start", (d) =>
        d.arrowStart || d.dummy ? `url(#arrowhead${getColor(d)})` : null
      )
      .attr("marker-end", (d) =>
        d.arrowStart && !d.dummy ? null : `url(#arrowhead${getColor(d)})`
      );

    function getColor(d) {
      if (d.country === "ACK") return "";
      return d.arrowStart ? "Blue" : "Red";
    }

    const texts = svg
      .append("g")
      .selectAll("g")
      .data([0, 1])
      .join("g")
      .attr(
        "transform",
        (i) => `translate(${x(i) + (i ? padding : -padding)},0)`
      )
      .attr("text-anchor", (i) => "middle")
      .selectAll("text")
      .data((i) =>
        d3.zip(
          data.map(i ? (d) => `` : (d) => ` ${d.country} `),
          dodge(data.map((d) => y(d[i ? endLine : startLine])))
        )
      )
      .join("text")
      .attr("y", ([, y]) => y - 10)
      .attr("x", (d, i) => (i === 0 || i === 3 ? 0 : 300))
      .attr("dy", "0.35em")
      .text(([text]) => text)
      .style("fond-size", "0")
      .on("click", (d) => {
        expandData = {
          title: d.srcElement.textContent,
          info: JSON.stringify(
            GetPayloadFor(d.srcElement.textContent, payloads),
            null,
            "\t"
          ),
        };
        setOpen(true);
      });

    texts
      .transition()
      .duration(10)
      .attr("y", ([, y]) => y)
      .style("font-size", (d) => 0 + "px")
      .on("end", () => {
        texts
          .transition()
          .duration(1800)
          .delay((d, i) => i * 2000)
          .attr("x", 150)
          .attr("y", ([, y]) => y - 10)
          .style("font-size", (d) => 18 + "px");
      });
  }, [data, prevData, payloads]);
  return (
    <>
      <svg ref={chartRef}></svg>
      <TransitionsModal open={open} setOpen={setOpen} data={expandData} />
    </>
  );
}

function dodge(positions, separation = 10, maxiter = 10, maxerror = 1e-1) {
  positions = Array.from(positions);
  let n = positions.length;
  if (!positions.every(isFinite)) throw new Error("invalid position");
  if (!(n > 1)) return positions;
  let index = d3.range(positions.length);
  for (let iter = 0; iter < maxiter; ++iter) {
    index.sort((i, j) => d3.ascending(positions[i], positions[j]));
    let error = 0;
    for (let i = 1; i < n; ++i) {
      let delta = positions[index[i]] - positions[index[i - 1]];
      if (delta < separation) {
        delta = (separation - delta) / 2;
        error = Math.max(error, delta);
        positions[index[i - 1]] -= delta;
        positions[index[i]] += delta;
      }
    }
    if (error < maxerror) break;
  }
  return positions;
}

function GetPayloadFor(title, sessionData) {
  title = title.trim();
  console.log(sessionData);
  if (title === "search") {
    return sessionData.search_trip.becknPayload;
  }
  if (title === "on_search") {
    return sessionData.on_search_trip.becknPayload;
  }
  if (title === "ACK") {
    return sessionData.on_search_trip.becknResponse;
  }
  return sessionData[title].becknPayload;
}

function MakeSlopeChart({ data, sessionData }) {
  return <Chart data={data} payloads={sessionData} />;
}
export default MakeSlopeChart;

const x = {
  context: {
    bap_id: "api.example-bap.com",
    bap_uri: "https://c379-103-173-93-158.ngrok-free.app/ondc",
    location: {
      country: {
        code: "IND",
      },
      city: {
        code: "std:044",
      },
    },
    transaction_id: "2ad42be7-d98f-45ec-b5ff-6d50447272fa",
    message_id: "28c3bac3-a151-4447-9876-9f9b79c0addc",
    timestamp: "2024-02-14T09:58:31.083Z",
    domain: "ONDC:TRV11",
    version: "2.0.0",
    ttl: "PT30S",
    action: "search",
  },
  message: {
    intent: {
      fulfillment: {
        stops: [
          {
            type: "START",
            location: {
              descriptor: {
                code: "SAT|0215",
              },
            },
          },
          {
            type: "END",
            location: {
              descriptor: {
                code: "SAL|0231",
              },
            },
          },
        ],
        vehicle: {
          category: "METRO",
        },
      },
      payment: {
        tags: [
          {
            descriptor: {
              code: "BUYER_FINDER_FEES",
            },
            list: [
              {
                descriptor: {
                  code: "BUYER_FINDER_FEES_TYPE",
                },
                value: "percent-annualized",
              },
              {
                descriptor: {
                  code: "BUYER_FINDER_FEES_PERCENTAGE",
                },
                value: "1",
              },
            ],
          },
          {
            descriptor: {
              code: "SETTLEMENT_TERMS",
            },
            list: [
              {
                descriptor: {
                  code: "DELAY_INTEREST",
                },
                value: "2.5",
              },
              {
                descriptor: {
                  code: "STATIC_TERMS",
                },
                value:
                  "https://bap.credit.becknprotocol.io/personal-banking/loans/personal-loan",
              },
            ],
          },
        ],
      },
    },
  },
};
