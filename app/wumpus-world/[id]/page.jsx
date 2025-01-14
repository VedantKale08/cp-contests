import React from 'react'
import Game from '../../components/Wumpus contest/Game'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const isRegistered = async () => {
  const cookieStore = await cookies();
  const hackerRankId = cookieStore.get("hackerRankId");
  if (!hackerRankId) {
    redirect(`/`);
  }
};

export default async function Home() {
  await isRegistered();
  return (
    <main>
      <Game />
    </main>
  )
}

