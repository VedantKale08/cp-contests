import { NextResponse } from "next/server";

export async function GET(request){
  try {
      const response = await fetch(
        "https://www.hackerrank.com/rest/contests/test-contest-1736071736/challenges/mystery-sums/leaderboard"
      );
      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      console.error(error.message);
      return NextResponse.json(error);
    }
}