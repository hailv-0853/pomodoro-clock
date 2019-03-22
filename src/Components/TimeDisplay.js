import React from "react";

const TimeDisplay = ({
  breakLength,
  minutes,
  isSession,
  seconds,
  breakMinutes
}) => (
  <div>
    {isSession ? (
      <div
        className={
          minutes === 0 || breakMinutes === 0
            ? "time-display time-display--warning"
            : "time-display"
        }
      >
        <div id="timer-label">Session</div>
        <div id="time-left">
          {minutes < 10 ? "0" + minutes : minutes}:{seconds}
        </div>
      </div>
    ) : (
      <div className="time-display">
        <div id="timer-label">Break</div>
        <div id="time-left">
          {breakMinutes < 10 ? "0" + breakMinutes : breakMinutes}:{seconds}
        </div>
      </div>
    )}
  </div>
);

export default TimeDisplay;
