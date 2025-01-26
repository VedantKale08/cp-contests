import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import React from "react";

export default function Controls({ onMove, disabled }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex space-x-2">
        <button
          onClick={() => onMove("up")}
          className={`bg-blue-500 px-7 py-2 rounded-lg shadow-md text-3xl font-bold text-white ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          <ArrowUp />
        </button>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onMove("left")}
          className={`bg-blue-500 px-7 py-2 rounded-lg shadow-md text-3xl font-bold text-white ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          <ArrowLeft />
        </button>
        <button
          onClick={() => onMove("down")}
          className={`bg-blue-500 px-7 py-2 rounded-lg shadow-md text-3xl font-bold text-white ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          <ArrowDown />
        </button>
        <button
          onClick={() => onMove("right")}
          className={`bg-blue-500 px-7 py-2 rounded-lg shadow-md text-3xl font-bold text-white ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}