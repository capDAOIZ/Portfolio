import React, { useEffect, useRef, useState } from "react";
import "./SnakeGame.css";

const CELL_SIZE = 20;
const BOARD_SIZE = 20;
const MOVE_INTERVAL = 200; // en milisegundos

type Position = { x: number; y: number };

const getRandomPosition = (): Position => ({
  x: Math.floor(Math.random() * BOARD_SIZE),
  y: Math.floor(Math.random() * BOARD_SIZE),
});

const SnakeGame: React.FC = () => {
    const animationRef = useRef<number | null>(null);
    const lastMoveTimeRef = useRef<number>(0);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>(getRandomPosition());
  const [direction, setDirection] = useState<Position>({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const gameLoop = (timestamp: number) => {
    if (gameOver) return;
  
    if (timestamp - lastMoveTimeRef.current > MOVE_INTERVAL) {
      moveSnake();
      lastMoveTimeRef.current = timestamp;
    }
  
    animationRef.current = requestAnimationFrame(gameLoop);
  };
  

  const moveSnake = () => {
    setSnake((prev) => {
      const newHead = {
        x: prev[0].x + direction.x,
        y: prev[0].y + direction.y,
      };

      const hitWall =
        newHead.x < 0 || newHead.y < 0 ||
        newHead.x >= BOARD_SIZE || newHead.y >= BOARD_SIZE;

      const hitSelf = prev.some((segment) => segment.x === newHead.x && segment.y === newHead.y);

      if (hitWall || hitSelf) {
        setGameOver(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return prev;
      }

      const newSnake = [newHead, ...prev];
      const ateFood = newHead.x === food.x && newHead.y === food.y;

      if (ateFood) {
        setFood(getRandomPosition());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  useEffect(() => {
    if (direction.x !== 0 || direction.y !== 0) {
      lastMoveTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(gameLoop);
    }
  
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [direction, gameOver]);
  
  

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      setDirection((prev) => {
        switch (e.key) {
          case "ArrowUp":
            return prev.y !== 1 ? { x: 0, y: -1 } : prev;
          case "ArrowDown":
            return prev.y !== -1 ? { x: 0, y: 1 } : prev;
          case "ArrowLeft":
            return prev.x !== 1 ? { x: -1, y: 0 } : prev;
          case "ArrowRight":
            return prev.x !== -1 ? { x: 1, y: 0 } : prev;
          default:
            return prev;
        }
      });
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const restartGame = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 0, y: 0 });
    setFood(getRandomPosition());
    setGameOver(false);
  };
  
  

  return (
    <div className="snake-container">
      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${BOARD_SIZE}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, ${CELL_SIZE}px)`,
        }}
      >
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, i) => {
          const x = i % BOARD_SIZE;
          const y = Math.floor(i / BOARD_SIZE);
          const isSnake = snake.some((s) => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={i}
              className={`cell ${isSnake ? "snake" : isFood ? "food" : ""}`}
            />
          );
        })}
      </div>
      {gameOver && (
        <div className="game-over">
          <p>¡Game Over!</p>
          <button onClick={restartGame}>Reiniciar</button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
