import { INITIAL_POSITION, GOAL_POSITION } from '../../../constansts';
import { isValidPosition, getAdjacentCells } from './gridUtils';

export const placePits = (grid) => {
  const predefinedPits = [
    { x: 3, y: 1 },
    { x: 4, y: 5 },
    { x: 4, y: 3 },
    { x: 1, y: 4 },
  ];

  predefinedPits.forEach(({ x, y }) => {
    const isValidPlacement =
      !(x === INITIAL_POSITION.x && y === INITIAL_POSITION.y) &&
      !(x === GOAL_POSITION.x && y === GOAL_POSITION.y);

    if (isValidPlacement) {
      grid[y][x] = ['pit'];
    }
  });
};

export const placeWumpus = (grid) => {
  let wumpusPlaced = 0;
  while (wumpusPlaced < 2) {
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
  // First pass: collect all effects without overwriting
  const cellEffects = new Map(); // Use Map to store effects for each cell

  // Helper function to add effect to a cell's collection
  const addEffectToCell = (x, y, effect) => {
    const key = `${x},${y}`;
    if (!cellEffects.has(key)) {
      cellEffects.set(key, new Set());
    }
    cellEffects.get(key).add(effect);
  };

  // Collect all effects
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

  // Apply effects to the grid
  cellEffects.forEach((effects, key) => {
    const [x, y] = key.split(',').map(Number);
    const cell = grid[y][x];
    
    if (cell[0] === 'empty') {
      // Convert Set to Array and ensure only one of each effect
      grid[y][x] = [...effects];
    } else if (cell.includes('pit') || cell.includes('wumpus')) {
      // For pit or wumpus cells, add unique effects while preserving the original element
      const mainElement = cell[0]; // 'pit' or 'wumpus'
      const newEffects = [...effects].filter(effect => !cell.includes(effect));
      grid[y][x] = [mainElement, ...newEffects];
    }
  });
};