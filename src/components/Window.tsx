import React, { useRef } from 'react';
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

  return (
    <Draggable nodeRef={nodeRef} handle=".title-bar">
      <div ref={nodeRef} className="window">
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
