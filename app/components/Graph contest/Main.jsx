"use client";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "./Sidebar";
import dynamic from "next/dynamic";

// Dynamically import Graph with ssr: false to disable server-side rendering
const Graph = dynamic(() => import("react-vis-network-graph"), { ssr: false });

function Main({ id, initialGraph }) {
  const [graph, setGraph] = useState(() => {
    const savedGraph = localStorage.getItem("graphState");
    return savedGraph ? JSON.parse(savedGraph) : initialGraph;
  });

  const [unlockedNodes, setUnlockedNodes] = useState(() => {
    const savedUnlockedNodes = localStorage.getItem("unlockedNodes");
    return savedUnlockedNodes ? JSON.parse(savedUnlockedNodes) : [1];
  });

  const options = {
    physics: false,
    nodes: {
      shape: "circularImage",
      size: 30,
      font: {
        size: 14,
        color: "#000",
        face: "Arial",
      },
      borderWidth: 2,
    },
    edges: {
      color: "#7E99A3",
      arrows: {
        to: { enabled: true, scaleFactor: 1 },
      },
      smooth: {
        enabled: true,
        type: "cubicBezier",
      },
      width: 1,
    },
    interaction: {
      zoomView: false,
      dragView: false,
      dragNodes: false,
      selectable: false,
    },
  };

  const events = {
    click: (event) => {
      const { nodes } = event;
      if (nodes.length > 0) {
        const clickedNodeId = nodes[0];
        handleNodeClick(clickedNodeId);
      }
    },
  };

  const handleNodeClick = (nodeId) => {
    const clickedNode = graph.nodes.find((node) => node.id === nodeId);

    if (unlockedNodes.includes(nodeId)) {
      window.open(clickedNode.contestLink, "_blank");
    } else {
      alert("This node is locked. Solve the previous problems to unlock it!");
    }
  };

  const unlockNeighbors = (nodeId) => {
    const neighbors = graph.edges
      .filter((edge) => edge.from === nodeId)
      .map((edge) => edge.to);

    setGraph((prevGraph) => {
      const updatedNodes = prevGraph.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, image: "/check.svg" }
          : neighbors.includes(node.id)
          ? { ...node, image: "/unlock.svg" }
          : node
      );

      const updatedGraph = { ...prevGraph, nodes: updatedNodes };

      localStorage.setItem("graphState", JSON.stringify(updatedGraph));
      return updatedGraph;
    });

    setUnlockedNodes((prev) => {
      const updatedUnlockedNodes = [...new Set([...prev, ...neighbors])];

      localStorage.setItem(
        "unlockedNodes",
        JSON.stringify(updatedUnlockedNodes)
      );
      return updatedUnlockedNodes;
    });
  };

  useEffect(() => {
    localStorage.setItem("graphState", JSON.stringify(graph));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header isContestPage={true}/>
      <main className="flex gap-3">
        <div className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-black mb-2">
            Graph Paths Contest
          </h1>
          <p className="text-center text-lg mb-4">
            Your HackerRank ID is: <span className="font-mono">{id}</span>
          </p>

          <div style={{ height: "500px", width: "100%" }}>
            <Graph
              graph={graph}
              options={options}
              events={events}
              style={{ height: "100%" }}
            />
          </div>
        </div>
        <Sidebar
          id={id}
          unlockNeighbors={unlockNeighbors}
          unlockedNodes={unlockedNodes}
        />
      </main>
    </div>
  );
}

export default Main;
