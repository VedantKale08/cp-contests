import React from 'react';
import { Trophy, Skull, Timer, Wind, SnailIcon as Nose, LockKeyholeIcon as Hole, DogIcon as Wolf, Flag } from 'lucide-react'
import { useGameStore } from './GameStore'

export default function ScoreBoard({ score, penalties,currentCellConditions }) {
  console.log(currentCellConditions);

  const ConditionIcon = ({ condition, icon: Icon, text }) => (
    <div className={`flex items-center ${currentCellConditions.includes(condition) ? 'text-blue-600' : 'text-gray-400'}`}>
      <Icon className="w-5 h-5" />
      <span className="ml-2">{text}</span>
    </div>
  );
  const remainingSteps = useGameStore((state) => state.remainingSteps)
  console.log("Remaining steps in ScoreBoard:", remainingSteps)

  return (
    <div className="mt-6 bg-white rounded-lg shadow-md p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Game Status</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-3 bg-green-100 rounded-lg">
          <Trophy className="w-6 h-6 text-green-600 mb-2" />
          <p className="text-sm font-semibold text-gray-600">Score</p>
          <p className="text-xl font-bold text-green-600">{score}</p>
        </div>
        <div className="flex flex-col items-center p-3 bg-red-100 rounded-lg">
          <Skull className="w-6 h-6 text-red-600 mb-2" />
          <p className="text-sm font-semibold text-gray-600">Penalties</p>
          <p className="text-xl font-bold text-red-600">{penalties}</p>
        </div>
        <div className="flex flex-col items-center p-3 bg-blue-100 rounded-lg">
          <Timer className="w-6 h-6 text-blue-600 mb-2" />
          <p className="text-sm font-semibold text-gray-600">Steps Left</p>
          <p className="text-xl font-bold text-blue-600">{remainingSteps}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Current Cell Conditions:</h3>
        <div className="grid grid-cols-2 gap-3">
          <ConditionIcon condition="breeze" icon={Wind} text="Breeze" />
          <ConditionIcon condition="stench" icon={Nose} text="Stench" />
          <ConditionIcon condition="pit" icon={Hole} text="Pit" />
          <ConditionIcon condition="wumpus" icon={Wolf} text="Wumpus" />
          <ConditionIcon condition="goal" icon={Flag} text="Goal" />
        </div>
        {currentCellConditions.length === 0 && (
          <p className="text-gray-600 mt-2">Nothing unusual in this cell.</p>
        )}
      </div>
    </div>
  );
}

