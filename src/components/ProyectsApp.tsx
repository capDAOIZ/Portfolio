import cryptolakeImg from "../assets/monedafinal.png";
import laravelImg from "../assets/laravelfinal.png";
import wallapopImg from "../assets/wallapopfinal.png";
import DesktopIcon from "./DesktopIcon";
import "./DesktopIcon.css";
import "./ProyectsApp.css";

function ProyectsApp() {
  const cryptolakeUrl =
    "https://github.com/capDAOIZ/CryptoLake-Plataforma-de-Anal-tica-Crypto-en-Tiempo-Real";
  const laravelUrl =
    "https://github.com/capDAOIZ/api-laravel--CRUD--REST--Documentacion_automatica--Preubas_generadas";
  const wallapopUrl =
    "https://github.com/capDAOIZ/Wallapop-Scraper-Alerts--Busqueda-automatica-y-notificaciones-por-Telegram";

  return (
    <div className="project-icons">
      <DesktopIcon
        label="CryptoLake"
        onDoubleClick={() => window.open(cryptolakeUrl, "_blank")}
        icon={cryptolakeImg}
      />
      <DesktopIcon
        label="Laravel API"
        onDoubleClick={() => window.open(laravelUrl, "_blank")}
        icon={laravelImg}
      />
      <DesktopIcon
        label="Wallapop"
        onDoubleClick={() => window.open(wallapopUrl, "_blank")}
        icon={wallapopImg}
      />
    </div>
  );
}

export default ProyectsApp;
