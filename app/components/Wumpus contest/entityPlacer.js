import { INITIAL_POSITION, GOAL_POSITION } from '../../../constansts';
import { isValidPosition, getAdjacentCells } from './gridUtils';

export const placePits = (grid) => {
  const predefinedPits = [
    {x: 7, y: 8},
    {x: 9, y: 6},
    {x: 4, y: 3},
  ]
  predefinedPits.forEach(({ x, y }) => {
    grid[y][x] = ['pit'];
  });
  let pitsPlaced = 0;
  while (pitsPlaced < 5) {
    const x = Math.floor(Math.random() * grid[0].length);
    const y = Math.floor(Math.random() * grid.length);

    const isValidPlacement =
      !(x === INITIAL_POSITION.x && y === INITIAL_POSITION.y) &&
      !(x === GOAL_POSITION.x && y === GOAL_POSITION.y) &&
      !grid[y][x].includes('pit') &&
      !grid[y][x].includes('wumpus');

    if (isValidPlacement) {
      grid[y][x] = ['pit'];
      pitsPlaced++;
    }
  }
};

export const placeWumpus = (grid) => {
  let wumpusPlaced = 0;
  while (wumpusPlaced < 3) {
    const x = Math.floor(Math.random() * grid[0].length);
    const y = Math.floor(Math.random() * grid.length);

    const isValidPlacement =
      !(x === INITIAL_POSITION.x && y === INITIAL_POSITION.y) &&
      !(x === GOAL_POSITION.x && y === GOAL_POSITION.y) &&
      !grid[y][x].includes('pit') &&
      !grid[y][x].includes('wumpus');

    if (isValidPlacement) {
      grid[y][x] = ['wumpus'];
      wumpusPlaced++;
    }
  }

};

export const addBreezeAndStench = (grid) => {
  const cellEffects = new Map();
  const addEffectToCell = (x, y, effect) => {
    const key = `${x},${y}`;
    if (!cellEffects.has(key)) {
      cellEffects.set(key, new Set());
    }
    cellEffects.get(key).add(effect);
  };
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x].includes('pit')) {
        getAdjacentCells(x, y).forEach(({ x: newX, y: newY }) => {
          addEffectToCell(newX, newY, 'breeze');
        });
      } else if (grid[y][x].includes('wumpus')) {
        getAdjacentCells(x, y).forEach(({ x: newX, y: newY }) => {
          addEffectToCell(newX, newY, 'stench');
        });
      }
    }
  }
  cellEffects.forEach((effects, key) => {
    const [x, y] = key.split(',').map(Number);
    const cell = grid[y][x];
    
    if (cell[0] === 'empty') {
      grid[y][x] = [...effects];
    } else if (cell.includes('pit') || cell.includes('wumpus')) {
      const mainElement = cell[0];
      const newEffects = [...effects].filter(effect => !cell.includes(effect));
      grid[y][x] = [mainElement, ...newEffects];
    }
  });
};