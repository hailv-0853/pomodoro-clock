import React, { Component } from "react";

import "./App.scss";
import BreakControl from "./Components/BreakControl";
import SessionControl from "./Components/SessionControl";
import TimeDisplay from "./Components/TimeDisplay";
import ButtonGroup from "./Components/ButtonGroup";
import Beep from "./Components/Beep";

class PomodoroApp extends Component {
  state = {
    breakLength: 5,
    sessionLength: 25,
    isSession: true,
    seconds: "00",
    sessionMinutes: 25,
    breakMinutes: 5,
    isRunning: false,
    isStarted: false,
    isBeep: false
  };
  handleInterval = 0;
  remainSeconds = 0;

  handleClick = (type, value) => {
    let { breakLength, sessionLength, isStarted } = this.state;
    if (!isStarted) {
      switch (type) {
        case "break":
          if (breakLength + value <= 60 && breakLength + value >= 1) {
            this.setState({
              breakLength: breakLength + value,
              breakMinutes: breakLength + value
            });
          }
          break;
        case "session":
          if (sessionLength + value <= 60 && sessionLength + value >= 1) {
            this.setState({
              sessionLength: sessionLength + value,
              sessionMinutes: sessionLength + value
            });
          }
          break;
        default:
          break;
      }
    }
  };

  tick = () => {
    let min;
    let sec;
    let { isSession, breakLength, sessionLength, isBeep } = this.state;
    if (
      this.remainSeconds === breakLength * 60 ||
      this.remainSeconds === sessionLength * 60
    )
      this.remainSeconds -= 1;

    if (this.remainSeconds >= 0) {
      min = Math.floor(this.remainSeconds / 60);
    } else {
      min = 0;
    }

    if (this.remainSeconds >= 0) sec = this.remainSeconds - min * 60;

    if (isSession && sec >= 0) {
      this.setState({
        sessionMinutes: min,
        seconds: sec
      });
    } else if (!isSession && sec >= 0) {
      this.setState({
        breakMinutes: min,
        seconds: sec
      });
    }

    if (sec < 10) {
      this.setState({
        seconds: "0" + sec
      });
    }

    if (min === 0 && this.remainSeconds === 0) {
      this.setState({
        isBeep: true
      });

      setTimeout(() => {
        this.setState({
          isBeep: false
        });
      }, 5000);
    }

    if (min === 0 && this.remainSeconds === -1) {
      this.setState({
        isSession: !isSession
      });
      if (isSession) {
        this.remainSeconds = breakLength * 60 + 1;
        this.setState({
          breakMinutes: breakLength
        });
      } else {
        this.remainSeconds = sessionLength * 60 + 1;
        this.setState({
          sessionMinutes: sessionLength
        });
      }
    }
    this.remainSeconds--;
  };

  startClock = () => {
    let { sessionLength, isRunning } = this.state;
    this.setState({
      isRunning: !isRunning,
      isStarted: true
    });
    this.handleInterval = setInterval(this.tick, 1000);
    if (this.remainSeconds === 0) {
      this.remainSeconds = sessionLength * 60;
    }
  };

  pauseClock = () => {
    let { isRunning } = this.state;
    clearInterval(this.handleInterval);
    this.setState({
      isRunning: !isRunning
    });
  };

  resetClock = () => {
    const initialState = {
      breakLength: 5,
      sessionLength: 25,
      isSession: true,
      seconds: "00",
      sessionMinutes: 25,
      breakMinutes: 5,
      isStarted: false
    };
    clearInterval(this.handleInterval);
    this.setState({
      ...initialState
    });
  };

  getBeep = () => {
    let { isBeep } = this.state;
    if (isBeep) return <Beep />;
  };

  render() {
    let {
      handleClick,
      resetClock,
      startClock,
      pauseClock,
      getBeep,
      state: {
        breakLength,
        sessionLength,
        isSession,
        seconds,
        isRunning,
        sessionMinutes,
        breakMinutes
      }
    } = this;
    return (
      <div className="App">
        <h1>Pomodoro Clock</h1>
        <div className="length-control-wrapper">
          <BreakControl breakLength={breakLength} handleClick={handleClick} />
          <SessionControl
            sessionLength={sessionLength}
            handleClick={handleClick}
          />
        </div>
        <TimeDisplay
          minutes={sessionMinutes}
          breakLength={breakLength}
          isSession={isSession}
          seconds={seconds}
          breakMinutes={breakMinutes}
        />
        <div>
          <ButtonGroup
            resetClock={resetClock}
            startClock={startClock}
            pauseClock={pauseClock}
            isRunning={isRunning}
          />
        </div>
        {getBeep()}
      </div>
    );
  }
}

export default PomodoroApp;
