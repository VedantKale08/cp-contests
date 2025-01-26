"use client"
import React from "react";

function page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-green-600">
          Contest Submitted Successfully!
        </h1>
        <p className="text-gray-600 mt-4">
          Thank you for participating in the contest. Your submission has been
          recorded successfully.
        </p>
        <div className="mt-6">
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition duration-200"
            onClick={() => (window.location.href = "/")} // Redirect to home or another page
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
