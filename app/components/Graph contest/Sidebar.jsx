import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { decode, encode } from "../Wumpus contest/GameStore";
import contestJson from "../../../graph-contest.json";

function Sidebar({ id, unlockNeighbors, unlockedNodes, setLoader }) {
  const [checkedState, setCheckedState] = useState(() => {
    const checked = localStorage.getItem("checkedState");
    return checked ? decode(checked) : Array(12).fill(false);
  });

  const [submissionTime, setSubmissionTime] = useState(() => {
    const submissions = localStorage.getItem("submissionTime");
    return submissions ? decode(submissions) : [];
  });

  const [solvedDistance, setSolvedDistance] = useState(() => {
    const solved = localStorage.getItem("solvedDistance");
    return solved ? decode(solved) : [];
  });

  useEffect(() => {
    localStorage.setItem("checkedState", encode(checkedState));
  }, [checkedState]);

  useEffect(() => {
    localStorage.setItem("submissionTime", encode(submissionTime));
  }, [submissionTime]);

  useEffect(() => {
    localStorage.setItem("solvedDistance", encode(solvedDistance));
  }, [solvedDistance]);

  const [distance, setDistance] = useState({
    12: 0,
    11: 1,
    10: 2,
    9: 2,
    8: 3,
    7: 3,
    6: 3,
    5: 4,
    4: 4,
    3: 4,
    2: 5,
    1: 5,
  });

  const checkSubmission = async (itemId, key) => {
    if (checkedState[key]) return;

    if (!unlockedNodes.includes(itemId)) {
      toast.error("You have not unlocked this question!");
      return;
    }

    setLoader(true);
    let currentProblem = contestJson[itemId];

    try {
      const response = await axios.get(
        `/api/leaderboard?challenge_name=${currentProblem.challenge_name}&contest_name=${currentProblem.contest_name}`
      );
      if (response.data) {
        const leaderboardData = response.data.models;
        const found = leaderboardData?.some(
          (element) => element.hacker === id && element.score === 100
        );
        if (found) {
          unlockNeighbors(itemId);
          const updatedState = [...checkedState];
          updatedState[key] = true;
          setCheckedState(updatedState);

          setLoader(false);

          let currTime = new Date();
          currTime =
            currTime.getHours() +
            ":" +
            currTime.getMinutes() +
            ":" +
            currTime.getSeconds();
          setSubmissionTime((prev) => {
            let updatedTimes = [...prev, { [itemId]: currTime }];
            return updatedTimes;
          });

          let d = distance[itemId];
          setSolvedDistance((prev) => [...prev, { [itemId]: d }]);

          toast("Great job! Problem solved successfully!", { icon: "🎉" });
        } else {
          setLoader(false);
          toast.error(
            "Please complete the problem before marking it as solved."
          );
        }
      }
    } catch (error) {
      setLoader(false);
      console.error("Error fetching leaderboard:", error);
      toast.error(error.message);
    }
  };

  return (
    <div
      className="w-[300px] border-l-2 p-4 px-6 sticky overflow-auto "
      style={{ height: "calc(100vh - 72px)" }}
    >
      <div className="mb-4">
        <p className="text-xl">Problems</p>
        <p className="text-sm text-gray-500">
          Mark the problem as solved once you complete it
        </p>
      </div>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, key) => (
        <div
          key={key}
          className="py-5 border-b flex justify-between items-center"
        >
          <label htmlFor={`cbtest-${key}`} className="cursor-pointer">
            Problem {item}
          </label>
          <div className="checkbox-wrapper-19">
            <input
              type="checkbox"
              id={`cbtest-${key}`}
              checked={checkedState[key]}
              onChange={() => checkSubmission(item, key)} // Pass the key for state tracking
            />
            <label htmlFor={`cbtest-${key}`} className="check-box" />
          </div>
        </div>
      ))}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Sidebar;
