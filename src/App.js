import "./App.css";

import { useRef, useState, useEffect } from "react";

function App() {
  const [playPause, setPlayPause] = useState(false);
  const [minutos, setMinutos] = useState(25);
  const [segundos, setSegundos] = useState(0);
  const [estadoSesion, setEstadoSesion] = useState("Session");
  const [sessionTime, setSessionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [borderColorClock, setBorderColorClock] = useState("");

  const audioRef = useRef(null);

  const playAudio = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.volume = 0.05;
    audioRef.current.pause();
    audioRef.current.play();
  }

  useEffect(() => {
    setMinutos(sessionTime);
    setSegundos(0);
  }, [sessionTime]);
  useEffect(() => {
    let timer = null;
    if (playPause) {
      timer = setInterval(() => {
        if (minutos === 0 && segundos === 0) {
          if (estadoSesion === "Session") {
            playAudio();
            setBorderColorClock("border-red");
            setEstadoSesion("Break");
            setMinutos(breakTime);
            setSegundos(0);
          } else {
            playAudio();
            setBorderColorClock("border-green");
            setEstadoSesion("Session");
            setMinutos(sessionTime);
            setSegundos(0);
          }
        } else if (segundos === 0) {
          setMinutos(minutos - 1);
          setSegundos(59);
        } else {
          setSegundos(segundos - 1);
        }
      }, 1000);
    } else {
      clearInterval(timer);    
    }
    return () => clearInterval(timer);
  }, [playPause, minutos, segundos, breakTime, sessionTime, estadoSesion]);


  const handleSessionIncrement = () => {
    if (!playPause && sessionTime < 60) setSessionTime(sessionTime + 1);
  };
  const handleSessionDecrement = () => {
    if (!playPause && sessionTime > 1) setSessionTime(sessionTime - 1);
  };
  const handleBreakIncrement = () => {
    if (!playPause && breakTime < 60) setBreakTime(breakTime + 1);
  };
  const handleBreakDecrement = () => {
    if (!playPause && breakTime > 1) setBreakTime(breakTime - 1);
  };
  const handleStartStop = () => {
    if (borderColorClock === '') setBorderColorClock("border-green");
    setPlayPause(!playPause);
  };

  const handleReset = () => {
    setBreakTime(5);
    setSessionTime(25);
    setMinutos(25);
    setSegundos(0);
    setEstadoSesion("Session");
    setPlayPause(false);
    setBorderColorClock("");
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="clock-title">Clock 25 + 5</h1>
        <div className="clock-settings">
          <div className="clock-settings__session">
            <h2 id="session-label" className="clock-settings__session-title">
              Session Length
            </h2>
            <div className="clock-settings__session-controls">
              <button
                id="session-increment"
                className="clock-settings__session-controls-increment"
                onClick={handleSessionIncrement}
              >
                <i className="fa fa-plus"></i>
              </button>
              <p
                id="session-length"
                className="clock-settings__session-controls-length"
              >
                {sessionTime}
              </p>
              <button
                id="session-decrement"
                className="clock-settings__session-controls-decrement"
                onClick={handleSessionDecrement}
              >
                <i className="fa fa-minus"></i>
              </button>
            </div>
          </div>
          <div className="clock-settings__break">
            <h2 id="break-label" className="clock-settings__break-title">
              Break Length
            </h2>
            <div className="clock-settings__break-controls">
              <button
                id="break-increment"
                className="clock-settings__session-controls-increment"
                onClick={handleBreakIncrement}
              >
                <i className="fa fa-plus"></i>
              </button>
              <p
                id="break-length"
                className="clock-settings__session-controls-length"
              >
                {breakTime}
              </p>
              <button
                id="break-decrement"
                className="clock-settings__session-controls-decrement"
                onClick={handleBreakDecrement}
              >
                <i className="fa fa-minus"></i>
              </button>
            </div>
          </div>
        </div>
        <div
          className={`clock-face ${borderColorClock}`}
        >
          <h2 id="timer-label">{estadoSesion}</h2>
          <p id="time-left">
            {minutos < 10 ? `0${minutos}` : minutos}:
            {segundos < 10 ? `0${segundos}` : segundos}
          </p>
        </div>
        <div className="clock-buttons">
          <button
            id="start_stop"
            className="clock-buttons__start"
            onClick={handleStartStop}
          >
            <i className={playPause ? "fa fa-pause" : "fa fa-play"}></i>
          </button>
          <button
            id="reset"
            className="clock-buttons__reset"
            onClick={handleReset}
          >
            <i className="fa fa-refresh"></i>
          </button>
        </div>
      </div>
      <audio id="beep" ref={audioRef} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" type="audio/mpeg"/> 
    </div>
  );
}

export default App;
