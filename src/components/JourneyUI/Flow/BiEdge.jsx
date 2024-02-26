import React, { useState } from "react";
import { useNodes, BezierEdge } from "reactflow";
import {
  getSmartEdge,
  pathfindingJumpPointNoDiagonal,
  svgDrawStraightLinePath,
} from "@tisoap/react-flow-smart-edge";
import TransitionsModal from "../../d3-visualization/ModalUI";
import "./Flow.css";

const foreignObjectSize = 150;
export default function SmartCustomEdge(props) {
  const {
    id,
    sourcePosition,
    targetPosition,
    sourceX,
    sourceY,
    targetX,
    targetY,
    style,
    markerStart,
    markerEnd,
    label,
  } = props;

  const nodes = useNodes();

  const getSmartEdgeResponse = getSmartEdge({
    sourcePosition,
    targetPosition,
    sourceX,
    sourceY,
    targetX,
    targetY,
    nodes,
    options: {
      drawEdge: svgDrawStraightLinePath,
      generatePath: pathfindingJumpPointNoDiagonal,
    },
  });

  const [open, setOpen] = useState(false);

  // If the value returned is null, it means "getSmartEdge" was unable to find
  // a valid path, and you should do something else instead
  if (getSmartEdgeResponse === null) {
    return <BezierEdge {...props} />;
  }

  const { edgeCenterX, edgeCenterY, svgPathString } = getSmartEdgeResponse;

  return (
    <>
      <path
        style={style}
        className="react-flow__edge-path"
        d={svgPathString}
        markerEnd={markerEnd}
        markerStart={markerStart}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - 40}
        y={edgeCenterY - 15}
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <button
          onClick={(event) => {
            event.stopPropagation();
            setOpen(true);
          }}
          className={`nodrag nopan edgeButton`}
        >
          {label[0]}
        </button>
      </foreignObject>
      <circle
        style={{ filter: `drop-shadow(3px 3px 5px ${style.stroke}` }}
        r="5"
        fill={`${style.stroke}`}
        className="circle"
      >
        <animate
          attributeName="r"
          values="4;5;4"
          dur=".5s"
          repeatCount="indefinite"
        />
        <animateMotion dur="6s" repeatCount="indefinite" path={svgPathString} />
      </circle>
      <TransitionsModal open={open} setOpen={setOpen} data={label[1]} />
    </>
  );
}
