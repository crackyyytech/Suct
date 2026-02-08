'use client';

import { useEffect } from 'react';

const DevToolsBlocker = () => {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Ctrl+Shift+I
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
      }
      // Ctrl+Shift+J
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
      }
      // Ctrl+U
      if (e.ctrlKey && e.key === 'U') {
        e.preventDefault();
      }
    };

    if (process.env.NODE_ENV === 'production') {
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
    }


    return () => {
      if (process.env.NODE_ENV === 'production') {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  return null;
};

export default DevToolsBlocker;
