import { useState, useCallback } from 'react';
import { Viewport } from '../types/Viewport';

export const useViewport = (initialScale = 1) => {
  const [viewport, setViewport] = useState<Viewport>({
    x: 0,
    y: 0,
    scale: initialScale,
  });

  const handlePan = useCallback((movementX: number, movementY: number) => {
    setViewport(prev => ({
      ...prev,
      x: prev.x + movementX,
      y: prev.y + movementY,
    }));
  }, []);

  const handleZoom = useCallback((clientX: number, clientY: number, deltaY: number) => {
    const factor = deltaY > 0 ? 0.9 : 1.1;
    setViewport(prev => {
      const newScale = prev.scale * factor;
      return {
        scale: newScale,
        x: clientX - (clientX - prev.x) * factor,
        y: clientY - (clientY - prev.y) * factor,
      };
    });
  }, []);

  return { viewport, setViewport, handlePan, handleZoom };
}




