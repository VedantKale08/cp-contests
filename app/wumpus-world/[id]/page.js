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
async function page({ params }) {
  const cookieStore = await cookies();
  const id = cookieStore.get("hackerRankId");
  await isRegistered();

  const problems = [
    { name: "estimating-fossil-ages", steps: 3 },
    { name: "string-duel-1", steps: 3 },
    { name: "the-kasol-conundrum123456", steps: 6 },
    { name: "find-the-cocchains", steps: 6 },
    { name: "we-got-rtx-6090-before-gta-vi", steps: 10},
    { name: "the-dance-of-eternal-gaze", steps: 10 },
  ];

  return (
    <main>
      <Game id={id} problems={problems} />
    </main>
  );
}

export default page;
