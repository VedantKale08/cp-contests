import Main from "@/app/components/Graph contest/Main";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const isRegistered = async () => {
  const cookieStore = await cookies();
  const hackerRankId = cookieStore.get("hackerRankId");
  if (!hackerRankId) {
    redirect(`/`);
  }
};

async function page({ params }) {
  await isRegistered();
  const id = await params.id;

  const initialGraph = {
    nodes: [
      {
        id: 0,
        label: "Start",
        x: 0,
        y: 0,
        color: "#ffcc00",
        image: "/start.svg",
        imagePadding: 15,
        contestLink: "",
      }, // Yellow
      {
        id: 1,
        label: "Problem 1",
        x: 200,
        y: 200,
        color: "#ff6666",
        image: "/unlock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/travelling-coder-mumbai",
      }, // Red
      {
        id: 2,
        label: "Problem 2",
        x: 200,
        y: 0,
        color: "#66cc66",
        image: "/unlock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/travelling-2-coder-delhi",
      }, // Green
      {
        id: 3,
        label: "Problem 3",
        x: 200,
        y: -200,
        color: "#66ccff",
        image: "/unlock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/travelling-coder-3-ahmedabad",
      }, // Blue
      {
        id: 4,
        label: "Problem 4",
        x: 400,
        y: 200,
        color: "#ffccff",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/travelling-coder-4-chennai",
      }, // Pink
      {
        id: 5,
        label: "Problem 5",
        x: 400,
        y: 0,
        color: "#cc9966",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/travelling-coder-bengaluru5",
      }, // Brown
      {
        id: 6,
        label: "Problem 6",
        x: 400,
        y: -200,
        color: "#ff9966",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/travelling-coder6-kochi",
      }, // Orange
      {
        id: 7,
        label: "Problem 7",
        x: 600,
        y: 200,
        color: "#6666cc",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/travelling-coder-kolkata7",
      }, // Purple
      {
        id: 8,
        label: "Problem 8",
        x: 600,
        y: 0,
        color: "#99cc99",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/8-travelling-coder-hyderabad",
      }, // Light Green
      {
        id: 9,
        label: "Problem 9",
        x: 800,
        y: 200,
        color: "#cc6666",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/travelling-coder-lucknow9",
      }, // Dark Red
      {
        id: 10,
        label: "Problem 10",
        x: 800,
        y: 0,
        color: "#99ccff",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/travelling-coder10-pune",
      }, // Light Blue
      {
        id: 11,
        label: "Problem 11",
        x: 1000,
        y: 0,
        color: "#ccff66",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/travelling11-coder-jaipur",
      }, // Lime
      {
        id: 12,
        label: "Goal\nProblem 12",
        x: 1200,
        y: 0,
        color: "#ffcc00",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/travelling-12-coder-guwahati",
      }, // Yellow
    ],
    edges: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 0, to: 3 },
      { from: 1, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 6 },
      { from: 4, to: 7 },
      { from: 5, to: 8 },
      { from: 7, to: 9 },
      { from: 8, to: 10 },
      { from: 10, to: 11 },
      { from: 6, to: 10 },
      { from: 11, to: 12 },
      { from: 9, to: 11 },
    ],
  };

  return (
    <div>
      <Main id={id} initialGraph={initialGraph}/>
    </div>
  );
}

export default page;
