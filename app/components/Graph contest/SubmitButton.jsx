"use client"
import React, { useState } from "react";
import ConfirmationPopup from "./ConfirmationPopup";

function SubmitButton({ setPopup }) {
    let solved = localStorage.getItem("solvedNodes");
  return (
    <div className="flex gap-3">
      <div className="bg-gray-700 px-3 py-1 rounded-full">Solved : {solved?.length ?? 0}</div>
      <button
        onClick={() => setPopup(true)}
        className="bg-green-700 px-3 py-1 rounded-full hover:opacity-80"
      >
        Submit
      </button>
    </div>
  );
}

export default SubmitButton;
