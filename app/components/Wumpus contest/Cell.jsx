import React from 'react'
import { FaSkull, FaWind, FaSmog, FaFlag } from 'react-icons/fa'
import { GiHole } from 'react-icons/gi'

export default function Cell({ types, isPlayer, isVisited }) {
  const getCellContent = () => {
    if (!isVisited && !isPlayer) {
      return null
    }

    return types.map((type, index) => {
      switch (type) {
        case 'pit':
          return <GiHole key={index} className="text-gray-800" />
        case 'wumpus':
          return <FaSkull key={index} className="text-red-600" />
        case 'breeze':
          return <FaWind key={index} className="text-blue-400" />
        case 'stench':
          return <FaSmog key={index} className="text-green-600" />
        case 'goal':
          return <FaFlag key={index} className="text-yellow-400" />
        default:
          return null
      }
    })
  }

  return (
    <div 
      className={`w-12 h-12 border border-gray-300 flex items-center justify-center ${
        isPlayer ? 'bg-blue-200' : isVisited ? 'bg-white' : 'bg-gray-400'
      }`}
      aria-label={isVisited ? types.join(', ') : 'Unknown'}
    >
      <div className="flex flex-wrap justify-center items-center">
        {getCellContent()}
      </div>
      {isPlayer && <div className="absolute w-4 h-4 bg-red-500 rounded-full" aria-label="Player" />}
    </div>
  )
}

