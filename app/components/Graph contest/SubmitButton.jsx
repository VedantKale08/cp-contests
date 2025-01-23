"use client"
import React, { useEffect, useState } from "react";
import ConfirmationPopup from "./ConfirmationPopup";
import { decode } from "../Wumpus contest/GameStore";

function SubmitButton({ setPopup }) {
    let solved = localStorage.getItem("solvedNodes");
    solved = solved ? decode(solved)?.length : 0;
  return (
    <div className="flex gap-3">
      <div className="bg-gray-700 px-3 py-1 rounded-full">Solved : {solved}</div>
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
