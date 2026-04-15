import './DesktopIcon.css';

interface DesktopIconProps {
  label: string;
  onDoubleClick: () => void;
  icon: string;  // Ruta o import de la imagen
}

function DesktopIcon({ label, onDoubleClick, icon }: DesktopIconProps) {
  return (
    <div className="desktop-icon" onDoubleClick={onDoubleClick}>
      <img src={icon} alt={label} />
      <span>{label}</span>
    </div>
  );
}

export default DesktopIcon;
