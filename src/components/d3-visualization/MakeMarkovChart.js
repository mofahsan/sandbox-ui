import * as d3 from "d3";
import React, { Component, useState } from "react";
import { useEffect, useRef } from "react";
import TransitionsModal from "./ModalUI";

const startLine = "BuyerApp";
const endLine = "SellerApp";

let expandData = { title: "", info: "", json: "" };
function MakeSlopeChart({ sessionData, config }) {
  const data = GenrateNewGraphData([], config.slice(3));
  return <Chart data={data} payloads={sessionData} />;
}
export default MakeSlopeChart;

function Chart({ data, payloads }) {
  const chartRef = useRef(null);
  const prevData = useRef(new Set());
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

    GenrateArrowHeads(svg);

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
        // console.log(prevData.current.values().includes(d));
        if (prevData.current.has(d.country)) {
          return 0;
        }
        count += 1;
        return count * 1500;
      })
      .duration((d, i) => {
        if (prevData.current.has(d.country)) return 0;
        return 1800;
      })
      .on("end", (data) => {
        prevData.current.add(data.country);
      })
      .attr("stroke-dashoffset", 0)
      .attr("stroke", (d) => {
        if (d.country.startsWith("ACK")) return "grey";
        return d.arrowStart ? "blue" : "red";
      })
      .attr("marker-start", (d) =>
        d.arrowStart || d.dummy ? `url(#arrowhead${getColor(d)})` : null
      )
      .attr("marker-end", (d) =>
        d.arrowStart && !d.dummy ? null : `url(#arrowhead${getColor(d)})`
      );

    function getColor(d) {
      if (d.country.startsWith("ACK")) return "";
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
          data.map(i ? (d) => `` : (d) => `${d.country}`),
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
        const payload = GetPayloadFor(d.srcElement.textContent, payloads);
        expandData = {
          title: d.srcElement.textContent,
          info: JSON.stringify(payload, null, "\t"),
          json: payload,
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
          .duration((d, i) => {
            if (prevData.current.has(d[0])) return 0;
            return 1800;
          })
          .delay((d, i) => {
            if (prevData.current.has(d[0])) return 0;
            return i * 2000;
          })
          .attr("x", 150)
          .attr("y", ([, y]) => y - 13)
          .style("font-size", (d) => 18 + "px");
      });
  }, [data, prevData, payloads]);
  //, prevData, payloads
  return (
    <>
      <svg ref={chartRef}></svg>
      <TransitionsModal open={open} setOpen={setOpen} data={expandData} />
    </>
  );
}

function GenrateArrowHeads(svg) {
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
  if (title.startsWith("ACK")) {
    return sessionData.on_search_trip.becknResponse;
  }
  return sessionData[title].becknPayload;
}

function GenrateNewGraphData(data, current) {
  // const currentAPI = apiList.indexOf(current);
  // if (currentAPI >= apiList.length) return data;
  // const current = apiList[currentAPI];
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
    country: "ACK_seller",
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
    country: "ACK_buyer",
    arrowStart: false,
  };
  return [...data, item1, item2, item3, item4];
}
