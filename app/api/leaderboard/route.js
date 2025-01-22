import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const challenge_name = searchParams.get("challenge_name");
  const contest_name = searchParams.get("contest_name");
  
  try {
      const response = await fetch(
        `https://www.hackerrank.com/rest/contests/${contest_name}/challenges/${challenge_name}/leaderboard`
      );
      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      console.error(error.message);
      return NextResponse.json(error);
    }
}