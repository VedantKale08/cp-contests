import { NextResponse } from "next/server";

export async function GET(request){
  try {
      const response = await fetch(
        "https://www.hackerrank.com/rest/contests/cp-club-final-round/challenges/mystery-sums/leaderboard?offset=0&limit=100&include_practice=false&_=1736781122745"
      );
      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      console.error(error.message);
      return NextResponse.json(error);
    }
}