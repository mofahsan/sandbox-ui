import React from "react";
import { Handle } from "reactflow";
import "./Flow.css";

export function SellerNode({ id, data }) {
  return (
    <div className="UpperDiv">
      <div
        // className={tw("rounded-t-md px-2 py-1 bg-blue-500 text-white text-sm")}
        className="NodeName"
        style={{ backgroundColor: "#ec4899" }}
      >
        SellerNode
      </div>
      <label className="NodeLabel">
        <div className="NodeP1">bpp_id</div>
        <div className="NodeP2">{data?.bpp_id}</div>
      </label>
      {/* <hr className="NodeHr" /> */}
      <Handle className="handle" type="source" position="bottom" />
      <Handle className="handle" type="target" position="top" />
    </div>
  );
}

export function GateWayNode({ id, data }) {
  return (
    <div className="UpperDiv">
      <div className="GateWayNode">Gateway Node</div>
      {/* <hr className="NodeHr" /> */}
      <Handle className="handle" type="source" position="bottom" />
      <Handle className="handle" type="target" position="top" />
    </div>
  );
}
