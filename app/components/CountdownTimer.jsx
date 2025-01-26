"use client";

import { useState, useEffect, useMemo } from "react";

export default function CountdownTimer() {
  const targetDate = useMemo(
    () => new Date("January 26, 2025 13:00:00").getTime(),
    []
  );
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call to set the state correctly

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="px-6 sm:px-20 md:px-40">
      <div className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white py-10 md:py-16 rounded-lg shadow-lg">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-8 tracking-wide">
            Contest Starts In
          </h2>
          <div
            className="flex justify-center space-x-6 md:space-x-12"
            aria-live="polite"
          >
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="text-xl md:text-2xl font-bold">{value}</div>
                <div className="text-sm md:text-lg uppercase text-gray-200">
                  {unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
