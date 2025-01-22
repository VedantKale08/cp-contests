"use client";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "./Sidebar";
import dynamic from "next/dynamic";
import ConfirmationPopup from "./ConfirmationPopup";
import toast from "react-hot-toast";
import Loader from "../Loader";
import { decode, encode } from "../Wumpus contest/GameStore";

// Dynamically import Graph with ssr: false to disable server-side rendering
const Graph = dynamic(() => import("react-vis-network-graph"), { ssr: false });

function Main({ id, initialGraph }) {
  const routes = [
    [1, 2, 5, 8, 10, 13],
    [1, 3, 6, 9, 11, 12, 13],
    [1, 4, 7, 11, 12, 13],
  ];

  const [graph, setGraph] = useState(() => {
    const savedGraph = localStorage.getItem("graphState");
    return savedGraph ? decode(savedGraph) : initialGraph;
  });

  const [unlockedNodes, setUnlockedNodes] = useState(() => {
    const savedUnlockedNodes = localStorage.getItem("unlockedNodes");
    return savedUnlockedNodes ? decode(savedUnlockedNodes) : [1, 2, 3];
  });

  const [solvedNodes, setSolvedNodes] = useState(() => {
    const savedSolvedNodes = localStorage.getItem("solvedNodes");
    return savedSolvedNodes ? decode(savedSolvedNodes) : [];
  });

  const [longestRoute, setLongestRoute] = useState([]);
  const [popUp, setPopup] = useState(false);
  const [isLoader, setLoader] = useState(false);

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
      selectable: true,
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
    if(nodeId === 0) return;

    const clickedNode = graph.nodes.find((node) => node.id === nodeId);    
    if (unlockedNodes.includes(nodeId) && !solvedNodes.includes(nodeId)) {
      window.open(clickedNode.contestLink, "_blank");
    } else if (!unlockedNodes.includes(nodeId)) {
      toast.error(
        "This node is locked. Solve the previous problems to unlock it!"
      );
    }
  };

  const unlockNeighbors = (nodeId) => {
    if(!solvedNodes.includes(nodeId)) {
      setSolvedNodes((prev) => {
      const updatedSolvedNodes = [...prev, nodeId];
      localStorage.setItem("solvedNodes", encode(updatedSolvedNodes));
      updateLongestRoute(updatedSolvedNodes);
      return updatedSolvedNodes;
    });
    }

    const neighbors = graph.edges
      .filter((edge) => edge.from === nodeId && !solvedNodes.includes(edge.to))
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

      localStorage.setItem("graphState", encode(updatedGraph));
      return updatedGraph;
    });

    setUnlockedNodes((prev) => {
      const updatedUnlockedNodes = [...new Set([...prev, ...neighbors])];

      localStorage.setItem(
        "unlockedNodes",
        encode(updatedUnlockedNodes)
      );
      return updatedUnlockedNodes;
    });
  };

  const updateLongestRoute = (solved) => {
    let maxRoute = [];

    routes.forEach((route) => {
      let currentRoute = [];
      for (let node of route) {
        if (solved.includes(node)) {
          currentRoute.push(node);
        } else {
          break;
        }
      }

      if (currentRoute.length > maxRoute.length) {
        maxRoute = currentRoute;
      }
    });

    setLongestRoute(maxRoute);
  };

  useEffect(() => {
    updateLongestRoute(solvedNodes);
  }, [solvedNodes]);

  useEffect(() => {
    localStorage.setItem("graphState", encode(graph));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header isContestPage={true} setPopup={setPopup} />
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
          setLoader={setLoader}
        />
        {popUp && <ConfirmationPopup setPopup={setPopup} solvedNodes={solvedNodes} longestRoute={longestRoute}/>}
        {isLoader && <Loader/>}
      </main>
    </div>
  );
}

export default Main;
