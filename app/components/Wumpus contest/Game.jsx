// pages/game.js (or wherever your game component is)

"use client";

import React, { useEffect } from 'react';
import { useGameStore } from './GameStore';
import Grid from './Grid';
import Controls from './Controls';
import ScoreBoard from './ScoreBoard';
import Link from 'next/link'; 

export default function Game() {
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
    remainingSteps,
  } = useGameStore();

  const getCurrentCellConditions = () => {
    if (!grid || !playerPosition) return [];
    const { x, y } = playerPosition;
    return grid[y][x] || [];
  };

  useEffect(() => {
    loadState();
  }, [loadState]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        Loading...
      </div>
    );
  }

  const currentCellConditions = getCurrentCellConditions();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex justify-between items-center w-full px-8 mb-8">
        <h1 className="text-4xl font-bold ml-10">Wumpus World Game</h1>
        <Link href="/wumpus-world/scoreboard">
          <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mr-10">
            View Scoreboard
          </button>
        </Link>
      </div>

      <div className="flex bg-white p-8 rounded-lg shadow-lg space-x-8">
        <div>
          <Grid
            grid={grid}
            playerPosition={playerPosition}
            visitedCells={visitedCells}
          />
        </div>

        <div>
          <Controls onMove={movePlayer} disabled={gameOver} />
        </div>

        <div>
          <ScoreBoard
            score={score}
            penalties={penalties}
            remainingSteps={remainingSteps}
            currentCellConditions={currentCellConditions}
          />
          {gameOver && (
            <div className="mt-4 text-center">
              <p className="text-xl font-bold mb-2 text-red-600">Game Over!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
