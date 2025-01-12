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
        id: 1,
        label: "Start\nProblem 1",
        x: 0,
        y: 0,
        color: "#ffcc00",
        image: "/unlock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/contest/problem1",
      }, // Yellow
      {
        id: 2,
        label: "Problem 2",
        x: 200,
        y: 200,
        color: "#ff6666",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/contest/problem1",
      }, // Red
      {
        id: 3,
        label: "Problem 3",
        x: 200,
        y: 0,
        color: "#66cc66",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/contest/problem1",
      }, // Green
      {
        id: 4,
        label: "Problem 4",
        x: 200,
        y: -200,
        color: "#66ccff",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/contest/problem1",
      }, // Blue
      {
        id: 5,
        label: "Problem 5",
        x: 400,
        y: 200,
        color: "#ffccff",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/contest/problem1",
      }, // Pink
      {
        id: 6,
        label: "Problem 6",
        x: 400,
        y: 0,
        color: "#cc9966",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/contest/problem1",
      }, // Brown
      {
        id: 7,
        label: "Problem 7",
        x: 400,
        y: -200,
        color: "#ff9966",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/contest/problem1",
      }, // Orange
      {
        id: 8,
        label: "Problem 8",
        x: 600,
        y: 200,
        color: "#6666cc",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/contest/problem1",
      }, // Purple
      {
        id: 9,
        label: "Problem 9",
        x: 600,
        y: 0,
        color: "#99cc99",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/contest/problem1",
      }, // Light Green
      {
        id: 10,
        label: "Problem 10",
        x: 800,
        y: 200,
        color: "#cc6666",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/contest/problem1",
      }, // Dark Red
      {
        id: 11,
        label: "Problem 11",
        x: 800,
        y: 0,
        color: "#99ccff",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/contest/problem1",
      }, // Light Blue
      {
        id: 12,
        label: "Problem 12",
        x: 1000,
        y: 0,
        color: "#ccff66",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/contest/problem1",
      }, // Lime
      {
        id: 13,
        label: "Goal\nProblem 13",
        x: 1200,
        y: 0,
        color: "#ffcc00",
        image: "/lock.svg",
        imagePadding: 15,
        contestLink: "https://www.hackerrank.com/contest/problem1",
      }, // Yellow
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 6 },
      { from: 4, to: 7 },
      { from: 5, to: 8 },
      { from: 6, to: 9 },
      { from: 8, to: 10 },
      { from: 9, to: 11 },
      { from: 11, to: 12 },
      { from: 7, to: 11 },
      { from: 12, to: 13 },
      { from: 10, to: 13 },
    ],
  };

  return (
    <div>
      <Main id={id} initialGraph={initialGraph}/>
    </div>
  );
}

export default page;
