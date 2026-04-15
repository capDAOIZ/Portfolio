import { useState, useRef, useEffect } from 'react';
import './Window.css'
import './Taskbar.css';
import start from '../assets/start1.png';
import closeIcon from '../assets/close-icon.png';

  interface TaskbarProps {
    activeWindow: string[];
  }

function Taskbar({ activeWindow }: TaskbarProps) {
  const getCurrentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const [time, setTime] = useState(getCurrentTime());
  const [focused, setFocused] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    function updateClock() {
      setTime(getCurrentTime());
  
      // calcular cuánto falta para el siguiente minuto exacto
      const now = new Date();
      const delay = (60 - now.getSeconds()) * 1000;
  
      setTimeout(updateClock, delay);
    }
  
    updateClock();
  
    return () => clearTimeout(updateClock as any);
  }, []);
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setLoading(true);
      setResponse("Pensando...");

      try {
        const res = await fetch("https://ia-prueba.onrender.com/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userMessage: input })
        });

        if (!res.ok) {
          throw new Error("Error al contactar con el servidor");
        }

        const data = await res.json();
        setResponse(data.reply);
      } catch (err) {
        console.error("❌ Error:", err);
        setResponse("⚠️ Ha ocurrido un error. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="taskbar">
      <button
        className="start-button"
        onClick={() => window.location.href = 'https://github.com/capDAOIZ'}
      >
        <img src={start} alt="a" />Start
      </button>

      <div className="search-container" ref={containerRef}>
        {focused &&
          <div className="search-popup animated">
            <div className="title-bar">
              <span className="title-bar-text">¿Qué quieres saber?</span>
              <div className="title-bar-controls">
                <button onClick={() => setFocused(false)}>
                  <img src={closeIcon} alt="Close" /><span></span>
                </button>
              </div>
            </div>
            <div className="popup-content">
              {loading ? <p><em>{response}</em></p> : <p>{response}</p>}
            </div>
          </div>
        }

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

      <div className="task">{activeWindow.join(' ')}</div>
      <div className="clock">{time}</div>
    </div>
  );
}

export default Taskbar;
