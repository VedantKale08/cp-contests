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
  const id = await params.id;
  await isRegistered();

  const problems = [
    { name: "mystery-sums", steps: 3 },
    { name: "life-of-a-flower", steps: 4 },
    { name: "vjti-coc-cp-contest", steps: 6 },
    { name: "problem-four", steps: 7 },
    { name: "problem-five", steps: 9 },
    { name: "problem-six", steps: 10 },
  ];

  return (
    <main>
      <Game id={id} problems={problems} />
    </main>
  );
}

export default page;
