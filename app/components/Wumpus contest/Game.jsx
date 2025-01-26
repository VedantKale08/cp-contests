"use client";
import React, { useEffect, useState } from "react";
import { useGameStore } from "./GameStore";
import Grid from "./Grid";
import Controls from "./Controls";
import ScoreBoard from "./ScoreBoard";
import ProblemBoard from "./ProblemBoard";
import Loader from "../Loader";
import ConfirmationPage from "./ConfirmationPage";

export default function Game({ id, problems }) {
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

  const [popup, setPopup] = useState(false);
  const remainingSteps = useGameStore((state) => state.remainingSteps); // Use hook instead of direct call

  useEffect(() => {
    if (typeof loadState === "function") {
      loadState();
    }
  }, [loadState]);

  const getCurrentCellConditions = () => {
    if (!grid || !playerPosition) return [];
    const { x, y } = playerPosition;
    return grid?.[y]?.[x] || [];
  };

  const currentCellConditions = getCurrentCellConditions();

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center w-full mb-8">
        <div className="flex flex-col items-center w-full">
          <h1 className="text-4xl font-bold text-center flex-grow">
            Wumpus World Game
          </h1>
          <p className="text-center text-lg mb-4">
            Your HackerRank ID is: <span className="font-mono">{id}</span>
          </p>
        </div>
        <button
          onClick={() => setPopup(true)}
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

        <div className="flex flex-col gap-4">
          <div className="bg-white p-6 rounded-lg shadow-lg h-fit">
            <ScoreBoard
              score={score}
              penalties={penalties}
              remainingSteps={remainingSteps}
              currentCellConditions={currentCellConditions}
            />
            {gameOver && (
              <div className="mt-4 text-center">
                <p className="text-xl font-bold mb-2 text-red-600">
                  Game Over!
                </p>
              </div>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Controls onMove={movePlayer} disabled={gameOver} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Problem List</h2>
        <ProblemBoard problems={problems} />
      </div>

      {popup && (
        <ConfirmationPage setPopup={setPopup} submitScore={submitScore} />
      )}
    </div>
  );
}
