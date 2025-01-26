"use client";

import { create } from "zustand";
import {
  INITIAL_POSITION,
  GOAL_POSITION,
  DEFAULT_PITS,
  PENALTIES,
  REWARDS,
  GRID_SIZE,
} from "../../../constansts";
import { createEmptyGrid, createInitialVisitedCells } from "./gridUtils";
import { placePits, placeWumpus, addBreezeAndStench } from "./entityPlacer";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { deleteCookie, getCookie } from "cookies-next";

const calculateEuclideanDistance = (playerPosition, goalPosition) => {
  const dx = playerPosition.x - goalPosition.x;
  const dy = playerPosition.y - goalPosition.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const encode = (data) => {
  try {
    const cleanedData = JSON.parse(JSON.stringify(data));
    return btoa(JSON.stringify(cleanedData));
  } catch (error) {
    console.error("Encoding error:", error);
    return null;
  }
};

export const decode = (encodedData) => {
  try {
    if (!encodedData) return null;
    const decodedString = atob(encodedData);
    return JSON.parse(decodedString);
  } catch (error) {
    console.error("Decoding error:", error);
    return null;
  }
};
const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

const checkTimeAndRedirect = (contestStartTime) => {
  const elapsedTime = new Date() - new Date(contestStartTime);
  if (elapsedTime > TWO_HOURS_MS) {
    window.location.href = "/";
    return true;
  }
  return false;
};

function formatTimestampToHMS(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
export const useGameStore = create((set, get) => ({
  grid: [],
  playerPosition: INITIAL_POSITION,
  score: 0,
  penalties: 0,
  gameOver: false,
  visitedCells: [],
  isLoaded: false,
  remainingSteps: 0,
  hasSubmitted: false,
  totalStepsSpent: 0,
  rewardedStepsByProblem: {},
  maxScoreTimestamp: 0,
  totalRewardedSteps: 0,

  initializeStepState: async () => {
    console.log("inisialize");

    const existingState = localStorage.getItem("stepState");
    let stepState = decode(existingState) || {
      totalRewardedSteps: 0,
      totalStepsSpent: 0,
    };
    console.log("above if");

    if (!stepState || typeof stepState !== "object") {
      console.log("inside if");
      stepState = { totalRewardedSteps: 0, totalStepsSpent: 0 };
    }
    console.log("below if");

    localStorage.setItem("stepState", encode(stepState));
    const remaining = Math.max(
      0,
      stepState.totalRewardedSteps - stepState.totalStepsSpent
    );
    set({
      remainingSteps: remaining,
      totalStepsSpent: stepState.totalStepsSpent,
    });
    console.log("end ");
  },

  updateRewardedSteps: async (problemScores) => {
    let stepState = decode(localStorage.getItem("stepState")) || {
      totalRewardedSteps: 0,
      totalStepsSpent: 0,
    };

    if (!stepState || typeof stepState !== "object") {
      stepState = { totalRewardedSteps: 0, totalStepsSpent: 0 };
    }

    let totalRewardedSteps = stepState.totalRewardedSteps || 0;

    const currentRewardedSteps = get().rewardedStepsByProblem || {};

    const rewardedStepsByProblem = {
      ...currentRewardedSteps,
      ...problemScores.reduce((acc, score) => {
        if (!score) return acc;

        const { problemName, userScore, maxScore, baseSteps } = score;
        const rewardedSteps = Math.floor((userScore / maxScore) * baseSteps);

        totalRewardedSteps -= currentRewardedSteps[problemName] || 0;
        totalRewardedSteps += rewardedSteps;

        acc[problemName] = rewardedSteps;
        return acc;
      }, {}),
    };

    set({ rewardedStepsByProblem });

    stepState.totalRewardedSteps = totalRewardedSteps;
    localStorage.setItem("stepState", encode(stepState));

    const remaining = Math.max(
      0,
      totalRewardedSteps - stepState.totalStepsSpent
    );
    set({
      remainingSteps: remaining,
      totalStepsSpent: stepState.totalStepsSpent,
    });
  },

  loadState: async () => {
    const contestStartTime = localStorage.getItem("contestStartTime");
    if (contestStartTime && checkTimeAndRedirect(contestStartTime)) return;

    const savedState = localStorage.getItem("wumpusWorldState");
    const stepState = localStorage.getItem("stepState");
    const hasSubmitted = localStorage.getItem("hasSubmitted") === "true";

    if (!stepState) {
      get().initializeStepState();
    }

    if (hasSubmitted) {
      deleteCookie("hackerRankId");
      deleteCookie("name");
      window.location.href = "/";
      return;
    }

    if (savedState) {
      const parsedState = decode(savedState);
      const stepState = decode(localStorage.getItem("stepState"));
      const remaining = Math.max(
        0,
        stepState.totalRewardedSteps - stepState.totalStepsSpent
      );
      set({
        ...parsedState,
        isLoaded: true,
        hasSubmitted,
        remainingSteps: remaining,
      });
    } else {
      const initialVisitedCells = createInitialVisitedCells();
      const newGrid = createEmptyGrid();

      placePits(newGrid, DEFAULT_PITS);
      placeWumpus(newGrid);
      newGrid[GOAL_POSITION.y][GOAL_POSITION.x] = ["goal"];
      addBreezeAndStench(newGrid);

      const stepState = decode(localStorage.getItem("stepState")) || {
        totalRewardedSteps: 0,
        totalStepsSpent: 0,
      };

      const initialState = {
        grid: newGrid,
        playerPosition: INITIAL_POSITION,
        visitedCells: initialVisitedCells,
        score: 0,
        penalties: 0,
        gameOver: false,
        isLoaded: true,
        remainingSteps: Math.max(
          0,
          stepState.totalRewardedSteps - stepState.totalStepsSpent
        ),
        hasSubmitted: false,
        totalStepsSpent: 0,
        maxScoreTimestamp: 0,
        totalRewardedSteps: 0,
      };

      localStorage.setItem("wumpusWorldState", encode(initialState));
      set(initialState);
    }
  },

  movePlayer: (direction) => {
    const contestStartTime = localStorage.getItem("contestStartTime");
    if (checkTimeAndRedirect(contestStartTime)) return;
  
    const hasSubmitted = localStorage.getItem("hasSubmitted") === "true";
    if (hasSubmitted) {
      deleteCookie("hackerRankId");
      deleteCookie("name");
      window.location.href = "/";
      return;
    }
  
    set((prev) => {
      if (prev.gameOver) return prev;
  
      const newPosition = { ...prev.playerPosition };
      switch (direction) {
        case "up":
          if (newPosition.y > 0) newPosition.y--;
          break;
        case "down":
          if (newPosition.y < GRID_SIZE - 1) newPosition.y++;
          break;
        case "left":
          if (newPosition.x > 0) newPosition.x--;
          break;
        case "right":
          if (newPosition.x < GRID_SIZE - 1) newPosition.x++;
          break;
      }
  
      if (
        newPosition.x === prev.playerPosition.x &&
        newPosition.y === prev.playerPosition.y
      ) {
        return prev;
      }
  
      const isNewCell = !prev.visitedCells[newPosition.y][newPosition.x];
      if (isNewCell) {
        let stepState = decode(localStorage.getItem("stepState")) || {
          totalRewardedSteps: 0,
          totalStepsSpent: 0,
        };
  
        if (!stepState || typeof stepState !== "object") {
          stepState = { totalRewardedSteps: 0, totalStepsSpent: 0 };
        }
  
        if (stepState.totalRewardedSteps - stepState.totalStepsSpent <= 0) {
          return prev;
        }
  
        stepState.totalStepsSpent++;
        localStorage.setItem("stepState", encode(stepState));
  
        const remaining = Math.max(
          0,
          stepState.totalRewardedSteps - stepState.totalStepsSpent
        );
        if (remaining < 0) return prev;
        set({ totalStepsSpent: stepState.totalStepsSpent });
      }
  
      const newVisitedCells = prev.visitedCells.map((row) => [...row]);
      newVisitedCells[newPosition.y][newPosition.x] = true;
  
      const cellTypes = prev.grid[newPosition.y][newPosition.x];
      let newScore = prev.score;
      let newPenalties = prev.penalties;
      let gameOver = prev.gameOver;
      if (isNewCell) {
        if (cellTypes.includes("pit")) {
          newPenalties += PENALTIES.PIT;
        } else if (cellTypes.includes("wumpus")) {
          newPenalties += PENALTIES.WUMPUS;
        }
      }
  
      if (cellTypes.includes("goal")) {
        newScore += REWARDS.GOAL;
        gameOver = true;
      }
  
      const euclideanDistance = (
        (1 - calculateEuclideanDistance(newPosition, GOAL_POSITION) / 13) *
        100
      ).toFixed(2);
      newScore = Math.max(newScore, euclideanDistance);
  
      const updatedRemainingSteps = isNewCell
        ? Math.max(0, prev.remainingSteps - 1)
        : prev.remainingSteps;
  
      let newMaxScoreTimestamp = prev.maxScoreTimestamp;
      if (newScore > prev.score) {
        newMaxScoreTimestamp = formatTimestampToHMS(new Date());
      }
  
      const newState = {
        ...prev,
        playerPosition: newPosition,
        visitedCells: newVisitedCells,
        score: newScore,
        penalties: newPenalties,
        gameOver,
        remainingSteps: updatedRemainingSteps,
        maxScoreTimestamp: newMaxScoreTimestamp,
      };
  
      localStorage.setItem("wumpusWorldState", encode(newState));
      return newState;
    });
  },
  
  submitScore: async () => {
    const { score, penalties, maxScoreTimestamp, hasSubmitted } = get();
    if (hasSubmitted) return;

    const elapsedTime =
      new Date() - new Date(localStorage.getItem("contestStartTime"));
    const hackerRankId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hackerRankId="))
      ?.split("=")[1];

    if (!hackerRankId) {
      console.error("HackerRank ID not found");
      return;
    }

    const userDocRef = doc(firestore, "users", hackerRankId);

    try {
      await setDoc(userDocRef, {
        score: score,
        penalties: penalties,
        elapsedTime: elapsedTime,
        maxScoreTimestamp: maxScoreTimestamp || null,
        name: getCookie("name"),
        hackerRankId: getCookie("hackerRankId"),
      });
      localStorage.setItem("hasSubmitted", "true");
      set({ hasSubmitted: true });
      console.log("Score and elapsed time saved in Firestore");
      deleteCookie("hackerRankId");
      deleteCookie("name");
      localStorage.clear();
      window.location.href = "/success";
    } catch (error) {
      console.error("Error saving score in Firestore:", error);
    }
  },
}));
