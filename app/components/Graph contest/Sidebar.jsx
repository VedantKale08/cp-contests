import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Sidebar({ id, unlockNeighbors, unlockedNodes }) {
  const [checkedState, setCheckedState] = useState(
    () =>
      JSON.parse(localStorage.getItem("checkedState")) || Array(12).fill(false)
  );

  useEffect(() => {
    localStorage.setItem("checkedState", JSON.stringify(checkedState));
  }, [checkedState]);

  const checkSubmission = async (itemId, key) => {
    if (checkedState[key]) return;

    if(!unlockedNodes.includes(itemId)){
      toast.error("You have not unlocked this question!")
      return;
    }

    try {
      const response = await axios.get("/api/leaderboard");
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
          toast("Great job! Problem solved successfully!", { icon: "🎉" });
        } else {
          toast.error(
            "Please complete the problem before marking it as solved."
          );
        }
      }
    } catch (error) {
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

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, key) => (
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
