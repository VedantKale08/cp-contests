import React from 'react'
import Cell from './Cell'

export default function Grid({ grid, playerPosition, visitedCells }) {
  return (
    <div
      className={`grid gap-1 mb-4`}
      style={{
        gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`,
      }}
    >
      {grid.map((row, y) =>
        row.map((cellTypes, x) => (
          <Cell
            key={`${x}-${y}`}
            types={cellTypes}
            isPlayer={x === playerPosition.x && y === playerPosition.y}
            isVisited={visitedCells[y][x]}
          />
        ))
      )}
    </div>
  )
}
