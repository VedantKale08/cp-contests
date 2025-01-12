"use client"
import React, { useState } from "react";
import ConfirmationPopup from "./ConfirmationPopup";

function SubmitButton() {
    const [popUp,setPopup] = useState(false);

  return (
    <div className="flex gap-3">
      <div className="bg-gray-700 px-3 py-1 rounded-full">Solved : 13</div>
      <button
        onClick={() => setPopup(true)}
        className="bg-green-700 px-3 py-1 rounded-full hover:opacity-80"
      >
        Submit
      </button>
      {popUp && <ConfirmationPopup setPopup={setPopup} />}
    </div>
  );
}

export default SubmitButton;
