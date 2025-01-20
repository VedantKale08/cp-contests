import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const problem = searchParams.get("problem");

  if (!problem) {
    return NextResponse.json(
      { error: "Problem name is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://www.hackerrank.com/rest/contests/cp-club-final-round/challenges/${problem}/leaderboard?offset=0&limit=100&include_practice=false`
    );
    const data = await response.json();
    // console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
