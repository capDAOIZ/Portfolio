import { useEffect, useRef, useState } from "react";
import start from "../assets/start1.png";
import closeIcon from "../assets/close-icon.png";
import { sendMessage } from "../services/chat";
import "./Window.css";
import "./Taskbar.css";

interface TaskbarProps {
  activeWindow: string[];
}

function Taskbar({ activeWindow }: TaskbarProps) {
  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const [time, setTime] = useState(getCurrentTime());
  const [focused, setFocused] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let timeoutId: number;

    const updateClock = () => {
      setTime(getCurrentTime());
      const now = new Date();
      const delay = (60 - now.getSeconds()) * 1000;
      timeoutId = window.setTimeout(updateClock, delay);
    };

    updateClock();
    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || input.trim() === "") {
      return;
    }

    setLoading(true);
    setResponse("Pensando...");

    try {
      const reply = await sendMessage(input);
      setResponse(reply);
    } catch (err) {
      console.error("Error:", err);
      setResponse("El asistente esta saturado ahora mismo. Intentalo de nuevo en unos segundos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="taskbar">
      <button
        className="start-button"
        onClick={() => {
          window.location.href = "https://github.com/capDAOIZ";
        }}
      >
        <img src={start} alt="a" />
        Start
      </button>

      <div className="search-container" ref={containerRef}>
        {focused && (
          <div className="search-popup animated">
            <div className="title-bar">
              <span className="title-bar-text">Que quieres saber?</span>
              <div className="title-bar-controls">
                <button onClick={() => setFocused(false)}>
                  <img src={closeIcon} alt="Close" />
                  <span />
                </button>
              </div>
            </div>

            <div className="popup-content">
              {loading ? (
                <p>
                  <em>{response}</em>
                </p>
              ) : (
                <p>{response}</p>
              )}
            </div>
          </div>
        )}

        <input
          type="text"
          className="search-input"
          placeholder="Pregunta"
          onFocus={() => setFocused(true)}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="task">{activeWindow.join(" ")}</div>
      <div className="clock">{time}</div>
    </div>
  );
}

export default Taskbar;
