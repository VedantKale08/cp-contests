import { INITIAL_POSITION, GOAL_POSITION } from '../../../constansts';
import { isValidPosition, getAdjacentCells } from './gridUtils';

export const placePits = (grid, numPits) => {
  let pitsPlaced = 0;
  while (pitsPlaced < numPits) {
    const x = Math.floor(Math.random() * grid[0].length);
    const y = Math.floor(Math.random() * grid.length);
    
    const isValidPlacement = 
      !(x === INITIAL_POSITION.x && y === INITIAL_POSITION.y) &&
      !(x === GOAL_POSITION.x && y === GOAL_POSITION.y) &&
      !grid[y][x].includes('pit');
    
    if (isValidPlacement) {
      grid[y][x] = ['pit'];
      pitsPlaced++;
    }
  }
};

export const placeWumpus = (grid) => {
  while (true) {
    const x = Math.floor(Math.random() * grid[0].length);
    const y = Math.floor(Math.random() * grid.length);
    
    const isValidPlacement = 
      !(x === INITIAL_POSITION.x && y === INITIAL_POSITION.y) &&
      !(x === GOAL_POSITION.x && y === GOAL_POSITION.y) &&
      !grid[y][x].includes('pit');
    
    if (isValidPlacement) {
      grid[y][x] = ['wumpus'];
      break;
    }
  }
};

export const addBreezeAndStench = (grid) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x].includes('pit')) {
        getAdjacentCells(x, y).forEach(({x: newX, y: newY}) => {
          if (grid[newY][newX][0] === 'empty') {
            grid[newY][newX] = ['breeze'];
          }
        });
      } else if (grid[y][x].includes('wumpus')) {
        getAdjacentCells(x, y).forEach(({x: newX, y: newY}) => {
          if (grid[newY][newX][0] === 'empty') {
            grid[newY][newX] = ['stench'];
          }
        });
      }
    }
  }
};