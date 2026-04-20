import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import './Window.css';

import closeIcon from '../assets/close-icon.png';

interface WindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

function Window({ title, onClose, children }: WindowProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <Draggable nodeRef={nodeRef} handle=".title-bar" disabled={isMobile}>
      <div ref={nodeRef} className={`window ${isMobile ? "mobile-window" : ""}`}>
        <div className="title-bar">
          <span className="title-bar-text">{title}</span>
          <div className="title-bar-controls">
            <button onClick={onClose}>
              <img src={closeIcon} alt="Close" /><span></span>
            </button>
          </div>
        </div>
        <div className="window-content">{children}</div>
      </div>
    </Draggable>
  );
}

export default Window;
