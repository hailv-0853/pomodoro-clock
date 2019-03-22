import React from "react";

const ButtonGroup = ({ resetClock, startClock, isRunning, pauseClock }) => (
  <div className="button-group">
    <button
      onClick={!isRunning ? startClock : pauseClock}
      id="start_stop"
      className="button button--start-pause"
    >
      Start/Pause
    </button>
    <button onClick={resetClock} id="reset" className="button button--reset">
      Reset
    </button>
  </div>
);

export default ButtonGroup;
