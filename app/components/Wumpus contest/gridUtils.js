import { GRID_SIZE, INITIAL_POSITION, GOAL_POSITION } from '../../../constansts';

export const createEmptyGrid = () => 
  Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(['empty']));

export const createInitialVisitedCells = () => {
  const cells = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false));
  cells[INITIAL_POSITION.y][INITIAL_POSITION.x] = true;
  return cells;
};

export const isValidPosition = (x, y) => 
  x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE;

export const getAdjacentCells = (x, y) => 
  [[0, 1], [0, -1], [1, 0], [-1, 0]]
    .map(([dx, dy]) => ({ x: x + dx, y: y + dy }))
    .filter(({x, y}) => isValidPosition(x, y));