"use client";
import React, { useEffect } from "react";
import { useGameStore } from "./GameStore";
import Grid from "./Grid";
import Controls from "./Controls";
import ScoreBoard from "./ScoreBoard";
import ProblemBoard from "./ProblemBoard";

export default function Game({ problems }) {
  const {
    grid,
    playerPosition,
    visitedCells,
    score,
    penalties,
    gameOver,
    isLoaded,
    loadState,
    movePlayer,
    submitScore,
  } = useGameStore();
  
  useEffect(() => {
    loadState();
  }, []); 

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        Loading...
      </div>
    );
  }

  const getCurrentCellConditions = () => {
    if (!grid || !playerPosition) return [];
    const { x, y } = playerPosition;
    return grid[y][x] || [];
  };

  const currentCellConditions = getCurrentCellConditions();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center w-full mb-8">
        <h1 className="text-4xl font-bold text-center flex-grow">Wumpus World Game</h1>
        <button
          onClick={submitScore}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Grid 
            grid={grid} 
            playerPosition={playerPosition} 
            visitedCells={visitedCells} 
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Controls onMove={movePlayer} disabled={gameOver} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ScoreBoard
            score={score}
            penalties={penalties}
            remainingSteps={useGameStore.getState().remainingSteps}
            currentCellConditions={currentCellConditions}
          />
          {gameOver && (
            <div className="mt-4 text-center">
              <p className="text-xl font-bold mb-2 text-red-600">Game Over!</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Problem List</h2>
        <ProblemBoard problems={problems} />
      </div>
    </div>
  );
}