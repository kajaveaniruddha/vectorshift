// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {}, // Add this line to initialize nodeIDs
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges
      ),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
  createInputNodeForVariable: (variable, targetNodeId) => {
    const variableToNodeTypeMapping = {
      llm: "llm",
      // add additional mappings as needed
    };
    const nodeType = variableToNodeTypeMapping[variable] || "customInput";
    const targetNode = get().nodes.find((node) => node.id === targetNodeId);
    if (!targetNode) return;

    const nodeId =
      nodeType === "llm"
        ? `llm-${targetNodeId}`
        : `input-${variable}-${targetNodeId}`;

    const newNode = {
      id: nodeId,
      type: nodeType,
      position: {
        x: targetNode.position.x - 300,
        y: targetNode.position.y,
      },
      data: {
        inputName: variable,
        nodeType: nodeType,
      },
    };

    console.log("Creating input node:", newNode);

    set({
      nodes: [...get().nodes, newNode],
    });
  },
}));
