import React from "react";

const SessionControl = ({ sessionLength, handleClick }) => (
  <div className="length-control">
    <h3 id="session-label">Session Length</h3>
    <button
      onClick={() => handleClick("session", -1)}
      id="session-decrement"
      className="button button--decrement"
    >
      -
    </button>
    <div id="session-length" className="length">
      {sessionLength}
    </div>
    <button onClick={() => handleClick("session", 1)} id="session-increment" className="button button--increment">
      +
    </button>
  </div>
);

export default SessionControl;
