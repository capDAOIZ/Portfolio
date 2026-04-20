import { useEffect, useState } from "react";
import DesktopIcon from "./components/DesktopIcon";
import Window from "./components/Window";
import Taskbar from "./components/Taskbar";
import AboutApp from "./components/AboutApp";
import ProjectsApp from "./components/ProyectsApp";
import SnakeApp from "./components/SnakeApp";
import ordenador from "./assets/ordenador.png";
import papel from "./assets/papel.png";
import stick from "./assets/joystick.png";
import correo from "./assets/correo.png";
import EmailApp from "./components/EmailApp";
import CV from "./components/CV";
import "./App.css";

type AppName = "Mi CV" | "Proyectos" | "Snake" | "Email" | "CV";

const WELCOME_STORAGE_KEY = "portfolio_welcome_seen_v1";

function App() {
  const [activeWindows, setActiveWindows] = useState<AppName[]>([]);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = window.localStorage.getItem(WELCOME_STORAGE_KEY) === "true";
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const openWindow = (app: AppName) => {
    if (app && !activeWindows.includes(app)) {
      setActiveWindows([...activeWindows, app]);
    }
  };

  const closeWindow = (app: AppName) => {
    setActiveWindows(activeWindows.filter((w) => w !== app));
  };

  const closeWelcome = () => {
    window.localStorage.setItem(WELCOME_STORAGE_KEY, "true");
    setShowWelcome(false);
  };

  return (
    <div className="desktop">
      <DesktopIcon label="Mi CV" icon={papel} onDoubleClick={() => openWindow("Mi CV")} />
      <DesktopIcon
        label="Proyectos"
        icon={ordenador}
        onDoubleClick={() => openWindow("Proyectos")}
      />
      <DesktopIcon label="Snake" icon={stick} onDoubleClick={() => openWindow("Snake")} />
      <DesktopIcon label="Email" icon={correo} onDoubleClick={() => openWindow("Email")} />

      {activeWindows.includes("Mi CV") && (
        <Window title="Sobre mí" onClose={() => closeWindow("Mi CV")}>
          <AboutApp openWindow={openWindow} />
        </Window>
      )}
      {activeWindows.includes("Proyectos") && (
        <Window title="Proyectos" onClose={() => closeWindow("Proyectos")}>
          <ProjectsApp />
        </Window>
      )}
      {activeWindows.includes("Snake") && (
        <Window title="Snake" onClose={() => closeWindow("Snake")}>
          <SnakeApp />
        </Window>
      )}
      {activeWindows.includes("Email") && (
        <Window title="Email" onClose={() => closeWindow("Email")}>
          <EmailApp />
        </Window>
      )}
      {activeWindows.includes("CV") && (
        <Window title="CV" onClose={() => closeWindow("CV")}>
          <CV />
        </Window>
      )}

      {showWelcome && (
        <div className="welcome-overlay">
          <div className="welcome-window">
            <div className="welcome-title-bar">
              <span className="welcome-title-text">Bienvenido</span>
            </div>
            <div className="welcome-content">
              <p>Soy Mario Garrido Martín. Este es mi portfolio interactivo estilo Windows 98.</p>
              <p>Uso básico:</p>
              <p>- Haz doble click en los iconos para abrir apps.</p>
              <p>- En la carpeta de Proyectos puedes ver mis trabajos destacados.</p>
              <p>- Snake abre un minijuego clásico para explorar el portfolio de forma interactiva.</p>
              <p>- En la barra inferior puedes preguntar sobre mi perfil.</p>
              <p>- En Email puedes enviarme un mensaje directo.</p>
              <p>- En CV puedes visualizar y descargar mi currículum.</p>
              <div className="welcome-actions">
                <button type="button" className="retro-button" onClick={closeWelcome}>
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Taskbar activeWindow={activeWindows} />
    </div>
  );
}

export default App;
