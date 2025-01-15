import { create } from 'zustand';
import { 
  INITIAL_POSITION, 
  GOAL_POSITION, 
  DEFAULT_PITS, 
  DEFAULT_STEPS,
  PENALTIES,
  REWARDS,
  GRID_SIZE
} from '../../../constansts';
import { createEmptyGrid, createInitialVisitedCells } from './gridUtils';
import { placePits, placeWumpus, addBreezeAndStench } from './entityPlacer';
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from '@/firebase/firebase';

const calculateEuclideanDistance = (playerPosition, goalPosition) => {
  const dx = playerPosition.x - goalPosition.x;
  const dy = playerPosition.y - goalPosition.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const encode = (data) => {
  return btoa(JSON.stringify(data)); 
};

const decode = (encodedData) => {
  return JSON.parse(atob(encodedData)); 
};

export const useGameStore = create((set, get) => ({
  grid: [],
  playerPosition: INITIAL_POSITION,
  score: 0,
  penalties: 0,
  gameOver: false,
  visitedCells: [],
  isLoaded: false,
  remainingSteps: DEFAULT_STEPS,

  setStepLimit: (limit) => {
    set({ remainingSteps: limit });
    localStorage.setItem('wumpusWorldState', encode(get())); 
  },

  loadState: async () => {
    const savedState = localStorage.getItem('wumpusWorldState');
    if (savedState) {
      const parsedState = decode(savedState);
      set({ ...parsedState, isLoaded: true });
    } else {
      const initialVisitedCells = createInitialVisitedCells();
      const newGrid = createEmptyGrid();
      
      placePits(newGrid, DEFAULT_PITS);
      placeWumpus(newGrid);
      newGrid[GOAL_POSITION.y][GOAL_POSITION.x] = ['goal'];
      addBreezeAndStench(newGrid);

      const remainingSteps = DEFAULT_STEPS;

      const initialState = {
        grid: newGrid,
        playerPosition: INITIAL_POSITION,
        visitedCells: initialVisitedCells,
        score: 0,
        penalties: 0,
        gameOver: false,
        isLoaded: true,
        remainingSteps: remainingSteps
      };

      localStorage.setItem('wumpusWorldState', encode(initialState)); 
      set(initialState);
    }
  },

  setGrid: (grid) => {
    set({ grid });
    localStorage.setItem('wumpusWorldState', encode(get())); 
  },

  setPlayerPosition: (newPosition) => {
    set({ playerPosition: newPosition });
    localStorage.setItem('wumpusWorldState', encode(get())); 
  },

  movePlayer: async (direction) => {
    set((prev) => {
      if (prev.gameOver) return prev;

      const newPosition = { ...prev.playerPosition };

      switch (direction) {
        case 'up':
          if (newPosition.y > 0) newPosition.y--;
          break;
        case 'down':
          if (newPosition.y < GRID_SIZE - 1) newPosition.y++;
          break;
        case 'left':
          if (newPosition.x > 0) newPosition.x--;
          break;
        case 'right':
          if (newPosition.x < GRID_SIZE - 1) newPosition.x++;
          break;
      }

      if (newPosition.x === prev.playerPosition.x && newPosition.y === prev.playerPosition.y) {
        return prev;
      }

      const isNewCell = !prev.visitedCells[newPosition.y][newPosition.x];
      if (isNewCell && prev.remainingSteps <= 0) {
        return prev;
      }

      const newVisitedCells = prev.visitedCells.map(row => [...row]);
      newVisitedCells[newPosition.y][newPosition.x] = true;

      const cellTypes = prev.grid[newPosition.y][newPosition.x];
      let newScore = prev.score;
      let newPenalties = prev.penalties;
      let gameOver = prev.gameOver;
      let newRemainingSteps = prev.remainingSteps;

      if (isNewCell) {
        newRemainingSteps--;
      }

      if (cellTypes.includes('pit')) {
        newPenalties += PENALTIES.PIT;
      } else if (cellTypes.includes('wumpus')) {
        newPenalties += PENALTIES.WUMPUS;
      } else if (cellTypes.includes('goal')) {
        newScore += REWARDS.GOAL;
        gameOver = true;
      }

      const euclideanDistance = ((1 - calculateEuclideanDistance(newPosition, GOAL_POSITION) / 10) * 100).toFixed(2);
      newScore = Math.max(newScore, euclideanDistance);

      const newState = {
        ...prev,
        playerPosition: newPosition,
        visitedCells: newVisitedCells,
        score: newScore,
        penalties: newPenalties,
        gameOver,
        remainingSteps: newRemainingSteps,
      };
      localStorage.setItem('wumpusWorldState', encode(newState)); 
      return newState;
    });
    const temp = await cookieStore.get("hackerRankId");
    const hackerRankId = temp.value;
    const userDocRef = doc(firestore, "users", hackerRankId);
    try {
      const newState = get();
      await updateDoc(userDocRef, {
        score: newState.score,
        penalties: newState.penalties,
      });
      console.log("Score updated in Firestore");
    } catch (error) {
      console.error("Error updating score in Firestore:", error);
    }
  }
}));
