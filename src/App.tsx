import { useState } from 'react';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import AboutApp from './components/AboutApp';
import ProjectsApp from './components/ProyectsApp';
import SnakeApp from './components/SnakeApp';
import ordenador from './assets/ordenador.png';
import papel from './assets/papel.png'
import './App.css';
import stick from './assets/joystick.png'
import EmailApp from './components/EmailApp';
import correo from './assets/correo.png'
import CV from './components/CV';

type AppName = 'Mi CV' | 'Proyectos' | 'Snake' | 'Email' | 'CV';

function App() {
  const [activeWindows, setActiveWindows] = useState<AppName[]>([]);

  const openWindow = (app: AppName) => {
    if (app && !activeWindows.includes(app)) {
      setActiveWindows([...activeWindows, app]);
    }
  };

  const closeWindow = (app: AppName) => {
    setActiveWindows(activeWindows.filter(w => w !== app));
  };

  return (
    <div className="desktop">
      <DesktopIcon label="Mi CV" icon={papel} onDoubleClick={() => openWindow('Mi CV')} />
      <DesktopIcon label="Proyectos" icon={ordenador} onDoubleClick={() => openWindow('Proyectos')} />
      <DesktopIcon label="Snake" icon={stick} onDoubleClick={() => openWindow('Snake')} />
      <DesktopIcon label="Email" icon={correo} onDoubleClick={() => openWindow('Email')} />

      {activeWindows.includes('Mi CV') && (
        <Window title="Sobre mí" onClose={() => closeWindow('Mi CV')}>
          <AboutApp openWindow={openWindow} />
        </Window>
      )}
      {activeWindows.includes('Proyectos') && (
        <Window title="Proyectos" onClose={() => closeWindow('Proyectos')}>
          <ProjectsApp />
        </Window>
      )}
      {activeWindows.includes('Snake') && (
        <Window title="Snake" onClose={() => closeWindow('Snake')}>
          <SnakeApp />
        </Window>
      )}
      {activeWindows.includes('Email') && (
        <Window title="Sobre mí" onClose={() => closeWindow('Email')}>
          <EmailApp />
        </Window>
      )}
      {activeWindows.includes('CV') && (
        <Window title="Doble click para descargar" onClose={() => closeWindow('CV')}>
          <CV />
        </Window>
      )}

      <Taskbar activeWindow={activeWindows} />
    </div>
  );
}

export default App;
