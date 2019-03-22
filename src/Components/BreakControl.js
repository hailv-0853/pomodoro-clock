import React from "react";

const BreakControl = ({ breakLength, handleClick }) => (
  <div className="length-control">
    <h3 id="break-label">Break Length</h3>
    <button
      onClick={() => handleClick("break", -1)}
      id="break-decrement"
      className="button button--decrement"
    >
      -
    </button>
    <div id="break-length" className="length">
      {breakLength}
    </div>
    <button
      onClick={() => handleClick("break", 1)}
      id="break-increment"
      className="button button--increment"
    >
      +
    </button>
  </div>
);

export default BreakControl;
