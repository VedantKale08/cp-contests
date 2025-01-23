import React from "react";
import PopupContainer from "../PopupContainer";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { decode } from "../Wumpus contest/GameStore";

function ConfirmationPopup({ setPopup, solvedNodes, longestRoute }) {
  const ref = collection(firestore, "submissions");
  const router = useRouter();
  
  let submissions = localStorage.getItem("submissionTime");
  submissions = decode(submissions);  

  let solvedDistance = localStorage.getItem("solvedDistance");
  solvedDistance = decode(solvedDistance);  

   const findMinValueWithKey = () => {
     let minKey = null;
     let minValue = Infinity;

     solvedDistance.forEach((obj) => {
       const [key, value] = Object.entries(obj)[0];
       if (value < minValue) {
         minValue = value;
         minKey = key;
       }
     });

     return { "question": minKey, "distance": minValue };
   };
  
  const handleSubmit = () => {
    try {
      
      let data = {
        team_name: getCookie("teamName"),
        hackerrank_username: getCookie("hackerRankId"),
        solved_questions: solvedNodes,
        submissionsTime: submissions,
        route: longestRoute,
        solvedDistance: solvedDistance,
        minDistance: findMinValueWithKey(),
      };

      addDoc(ref, data);
      deleteCookie("hackerRankId");
      deleteCookie("teamName");
      localStorage.clear();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <PopupContainer closeBtn={true} setPopup={setPopup}>
      <div className="bg-white px-6 py-4 pb-6 rounded-md text-black flex flex-col gap-4">
        <p className="text-xl font-extrabold pt-2 text-center">
          Ready to submit your contest entry?
        </p>
        <p className="text-sm text-[#838186] text-center mb-6">
          Submitting your contest entry will overwrite your current progress and
          finalize your submission. Please ensure all your data is correct
          before proceeding, as any unsaved changes will be lost and cannot be
          recovered after submission.
        </p>

        <button
          onClick={handleSubmit}
          className="bg-green-700 w-full py-2 rounded-md text-white"
        >
          Submit
        </button>
      </div>
    </PopupContainer>
  );
}

export default ConfirmationPopup;
