import { NextResponse } from "next/server";

async function fetchLeaderboardPage(problem, offset) {
  const response = await fetch(
    `https://www.hackerrank.com/grid-of-doom/challenges/${problem}/leaderboard?offset=${offset}&limit=100&include_practice=false`
  );
  return response.json();
}

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
    const offsets = [0, 100, 200, 300, 400];
    const requests = offsets.map(offset => fetchLeaderboardPage(problem, offset));

    const results = await Promise.all(requests);
    const combinedData = {
      models: [],
      total: 0,
    };

    results.forEach(result => {
      if (result.models) {
        combinedData.models = [...combinedData.models, ...result.models];
        if (combinedData.total === 0) {
          combinedData.total = result.total;
        }
      }
    });

    return NextResponse.json(combinedData);
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard data" },
      { status: 500 }
    );
  }
}
