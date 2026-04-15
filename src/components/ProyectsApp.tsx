import proyectosImg from '../assets/ordenador.png';
import curriculumImg from '../assets/papel.png';
import DesktopIcon from './DesktopIcon';
import './DesktopIcon.css';
import './ProyectsApp.css'; // <- Esto importa los estilos

function ProyectsApp() {
  return (
    <div className="project-icons">
      <DesktopIcon
        label="Proyectos"
        onDoubleClick={() =>
          window.open(
            'https://openrouter.ai/activity?api_key_id=6195504&to=2025-07-29T11%3A57%3A39.343Z&from=2025-06-29T11%3A57%3A39.735Z',
            '_blank'
          )
        }
        icon={proyectosImg}
      />
      <DesktopIcon
        label="Currículum"
        onDoubleClick={() => console.log('Abriendo Currículum')}
        icon={curriculumImg}
      />
    </div>
  );
}

export default ProyectsApp;
