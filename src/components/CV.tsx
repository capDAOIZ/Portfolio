import './AboutApp.css';
import cvPreview from '../assets/prueba.png';

function CV() {
  const handleDoubleClick = () => {
    const link = document.createElement('a');
    link.href = '/mi-cv.pdf';
    link.download = 'Mi-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
        <img
          src={cvPreview}
          alt="Previsualización del CV"
          onDoubleClick={handleDoubleClick}
        />
    </div>
  );
}

export default CV;
