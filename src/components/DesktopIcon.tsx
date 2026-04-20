import './DesktopIcon.css';

interface DesktopIconProps {
  label: string;
  onDoubleClick: () => void;
  icon: string;  // Ruta o import de la imagen
}

function DesktopIcon({ label, onDoubleClick, icon }: DesktopIconProps) {
  const handleClick = () => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      onDoubleClick();
    }
  };

  return (
    <div className="desktop-icon" onDoubleClick={onDoubleClick} onClick={handleClick}>
      <img src={icon} alt={label} />
      <span>{label}</span>
    </div>
  );
}

export default DesktopIcon;
