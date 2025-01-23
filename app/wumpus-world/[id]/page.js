import React from "react";
import Game from "../../components/Wumpus contest/Game";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const isRegistered = async () => {
  const cookieStore = await cookies();
  const hackerRankId = cookieStore.get("hackerRankId");
  if (!hackerRankId) {
    redirect(`/`);
  }
};

const page = async ({ params }) => {
  const cookieStore = await cookies();
  const id = cookieStore.get("hackerRankId");
  await isRegistered();

  const problems = [
    { name: "estimating-fossil-ages", steps: 3, score: 100 },
    { name: "string-duel-1", steps: 3, score: 200 },
    { name: "the-kasol-conundrum123456", steps: 6, score: 300 },
    { name: "find-the-cocchains", steps: 6, score: 400 },
    { name: "we-got-rtx-6090-before-gta-vi", steps: 10, score: 500 },
    { name: "the-dance-of-eternal-gaze", steps: 10, score: 600 },
  ];
  if (typeof window !== "undefined") {
    const storedProblems = localStorage.getItem("problems");

    if (!storedProblems) {
      const problemsWithRewards = problems.map((problem) => ({
        ...problem,
        rewarded: 0,
      }));
      localStorage.setItem("problems", JSON.stringify(problemsWithRewards));
    }
  }

  return (
    <main>
      <Game id={id} problems={problems} />
    </main>
  );
};

export default page;
