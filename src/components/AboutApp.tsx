import './AboutApp.css';

interface AboutAppProps {
  openWindow: (app: 'CV') => void;
}

function AboutApp({ openWindow }: AboutAppProps) {
  return (
    <div>
      <p className='p-about'>Hola, soy un desarrollador apasionado por el backend y la inteligencia artificial.</p>
      <div className="retro-button-container">
        <button
          type="button"
          className="retro-button"
          onClick={() => openWindow('CV')}
        >
          Ver CV
        </button>
      </div>
    </div>
  );
}

export default AboutApp;
