import React, { useEffect } from "react";

export default function Controls({ onMove, disabled }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (disabled) return;

      switch (event.key) {
        case "ArrowUp":
          onMove("up");
          break;
        case "ArrowDown":
          onMove("down");
          break;
        case "ArrowLeft":
          onMove("left");
          break;
        case "ArrowRight":
          onMove("right");
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onMove, disabled]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        <button
          onClick={() => onMove("up")}
          className={`bg-blue-500 p-3 rounded-full shadow-md text-3xl font-bold text-white ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          ↑
        </button>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => onMove("left")}
          className={`bg-blue-500 p-3 rounded-full shadow-md text-3xl font-bold text-white ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          ←
        </button>
        <button
          onClick={() => onMove("right")}
          className={`bg-blue-500 p-3 rounded-full shadow-md text-3xl font-bold text-white ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          →
        </button>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => onMove("down")}
          className={`bg-blue-500 p-3 rounded-full shadow-md text-3xl font-bold text-white ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          ↓
        </button>
      </div>
    </div>
  );
}
