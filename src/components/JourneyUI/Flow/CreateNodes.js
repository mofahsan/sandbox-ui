import { MarkerType } from "reactflow";
export const badEdge = {
  type: "bi",
  animated: "true",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 10,
    height: 10,
    color: "red",
  },
  style: {
    strokeWidth: 2,
    stroke: "red",
    strokeDasharray: 5,
  },
};
export const goodEdge = {
  type: "bi",
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 10,
    height: 10,
    color: "#00a611",
  },
  style: {
    strokeWidth: 2.5,
    stroke: "#00a611",
    strokeDasharray: 5,
    // animation: "dashdraw 0.2s linear infinite",
  },
  className: "connection-label",
};
export function CreateNodesAndEdges(
  protocolCalls,
  config,
  transactionId,
  getSession
) {
  if (!config) return [[], []];
  const [nodes, buyerId, sellerIds, gateWayId] = CreateNodes(
    protocolCalls,
    config,
    transactionId,
    getSession
  );
  const edges = CreateEdges(
    protocolCalls,
    config,
    buyerId,
    sellerIds,
    gateWayId
  );
  return [nodes, edges];
}

function CreateNodes(protocolCalls, config, transactionId, getSession) {
  // const data = protocolCalls[config];
  // const on_data = protocolCalls[`on_${config}`];
  let nodes = [];
  let buyerId = "";
  let sellerIds = [];
  let gateWayId = "GATEWAY";
  buyerId = AddBuyerNode(
    protocolCalls,
    config,
    transactionId,
    nodes,
    gateWayId,
    buyerId,
    getSession
  );

  if (protocolCalls[Object.keys(protocolCalls)[1]].executed) {
    const pay = protocolCalls[Object.keys(protocolCalls)[1]].becknPayload;
    pay.forEach((p, i) => {
      AddSellerNode(nodes, sellerIds, p.context.bpp_id, i);
    });
  }

  // if (on_data.executed) {
  //   if (data.type === "search") {
  //     const pay = protocolCalls[Object.keys(protocolCalls)[1]].becknPayload;
  //     pay.forEach((p, i) => {
  //       AddSellerNode(nodes, sellerIds, p.context.bpp_id, i);
  //     });
  //   } else {
  //     const bpp_id = on_data.becknPayload[0].context.bpp_id;
  //     AddSellerNode(nodes, sellerIds, bpp_id);
  //   }
  // } else {
  //   if ("becknResponse" in data) {
  //     console.log(data);
  //     if (data.type !== "search") {
  //       const bpp_id =
  //         protocolCalls[data.preRequest].becknPayload[0]?.context.bpp_id ||
  //         "id";
  //       AddSellerNode(nodes, sellerIds, bpp_id);
  //     }
  //   }
  // }

  return [nodes, buyerId, sellerIds, gateWayId];
}

function CreateEdges(protocolCalls, config, buyerId, sellerIds, gateWayId) {
  const data = protocolCalls[config];
  const on_data = protocolCalls[`on_${config}`];
  let edges = [];
  if (data.executed && on_data.executed) {
    if (data.type === "search") {
      AddSingleEdge(edges, buyerId, gateWayId, config, protocolCalls);
      const pay = protocolCalls[`on_${config}`].businessPayload;
      pay.forEach((p, i) => {
        AddSingleEdge(edges, gateWayId, sellerIds[i], config, protocolCalls);
        AddSingleEdge(
          edges,
          sellerIds[i],
          buyerId,
          `on_${config}`,
          protocolCalls
        );
      });
    } else {
      const payload = GetModalData(protocolCalls, config).json;
      const target = payload.context.bpp_id;
      AddSingleEdge(edges, buyerId, target, config, protocolCalls);
      AddSingleEdge(edges, target, buyerId, `on_${config}`, protocolCalls);
    }
  } else {
    if ("becknResponse" in data) {
      // console.log("hello");
      // console.log(protocolCalls);
    }
  }
  return edges;
}

function AddSingleEdge(edges, source, target, config, protocolCalls) {
  const data = GetModalData(protocolCalls, config, source);
  const error = hasError(data.json);
  const prop = error ? badEdge : goodEdge;
  edges.push({
    id: `${source}->${target}`,
    source: source,
    target: target,
    label: [config, data],
    ...prop,
  });
  console.log(edges);
}

function hasError(json) {
  if (json && typeof json === "object") {
    return json.hasOwnProperty("error");
  }
  return false;
}
function getSingleElementIfList(variable) {
  if (Array.isArray(variable) && variable.length === 1) {
    return variable[0];
  } else {
    return variable; // Or any other value to signify that the variable is not a list with one element
  }
}
function GetModalData(protocolCalls, config, source = null) {
  let payload = protocolCalls[config].becknPayload;
  if (payload.length > 1 && source) {
    payload = payload.find((j) => j.context?.bpp_id === source);
  } else {
    payload = getSingleElementIfList(payload);
  }
  return {
    title: config,
    info: JSON.stringify(payload, null, "\t"),
    json: payload,
  };
}

function AddBuyerNode(
  protocolCalls,
  config,
  transactionId,
  nodes,
  gateWayId,
  buyerId,
  getSession
) {
  const first = protocolCalls[Object.keys(protocolCalls)[0]];
  if (protocolCalls[config].type === "search") {
    nodes.push({
      id: gateWayId,
      type: "gate",
      position: { x: 600, y: 275 },
    });
  }
  if (first.executed) {
    const bap_id = first.becknPayload.context.bap_id;
    buyerId = bap_id + "1";
    nodes.push({
      id: buyerId,
      type: "buyer",
      position: { x: 600, y: 75 },
      data: {
        bap_id: bap_id,
        config: config,
        transactionId: transactionId,
        protocolCalls: protocolCalls,
        getSession: getSession,
      },
    });
  }
  return buyerId;
}
//transactionId:
function AddSellerNode(nodes, sellerIds, bpp_id, i = 0) {
  sellerIds.push(bpp_id);
  nodes.push({
    id: bpp_id,
    type: "seller",
    position: { x: 300 + 600 * i, y: 350 },
    data: { bpp_id: bpp_id },
  });
}
