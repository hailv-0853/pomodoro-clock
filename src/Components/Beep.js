import React from "react";
import beepSound from "../alarm_beep.mp3";
import Sound from "react-sound";

const Beep = () => <Sound url={beepSound} playStatus={"PLAYING"} />;

export default Beep;
