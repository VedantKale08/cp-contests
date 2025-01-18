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

  return (
    <main>
      <Game id={id} />
    </main>
  );
}

export default page;
