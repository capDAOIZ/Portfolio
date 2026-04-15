import SnakeGame from './SnakeGame';
import "./SnakeApp.css";

function SnakeApp() {
  return (
    <div className="snake-app-window">
      <div className="snake-app-body">
        <SnakeGame />
      </div>
    </div>
  );
}

export default SnakeApp;
