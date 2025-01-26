import React from "react";
import PopupContainer from "../PopupContainer";

function ConfirmationPage({ setPopup, submitScore }) {
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
          onClick={submitScore}
          className="bg-green-700 w-full py-2 rounded-md text-white"
        >
          Submit
        </button>
      </div>
    </PopupContainer>
  );
}

export default ConfirmationPage;
