import React, { useEffect } from 'react';

export default function Controls({ onMove, disabled }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (disabled) return;

      switch (event.key) {
        case 'ArrowUp':
          onMove('up');
          break;
        case 'ArrowDown':
          onMove('down');
          break;
        case 'ArrowLeft':
          onMove('left');
          break;
        case 'ArrowRight':
          onMove('right');
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onMove, disabled]);

  return null; 
}

