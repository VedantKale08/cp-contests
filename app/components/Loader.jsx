import React, { useEffect } from 'react'
import stopOverflow from "../../lib/stopOverflow";

function Loader() {
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
    stopOverflow.stop();
    return () => {
      stopOverflow.start();
    };
  }, []);
  return (
    <div className=' absolute inset-0 flex justify-center items-center'>
        <div className='loader'></div>
    </div>
  )
}

export default Loader