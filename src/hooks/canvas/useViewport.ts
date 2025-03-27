import { useState, useCallback } from 'react';
import { Viewport } from '../../types/Canvas';

export const useViewport = (
  initialX = 0,
  initialY = 0,
  initialScale = 1,
  minScale = 0.1,
  maxScale = 10,
) => {
  const [viewport, setViewport] = useState<Viewport>({
    x: initialX,
    y: initialY,
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
      const newScale = Math.max(minScale, Math.min(maxScale, prev.scale * factor));
      
      if (newScale !== prev.scale) {
        return {
          scale: newScale,
          x: clientX - (clientX - prev.x) * (newScale / prev.scale),
          y: clientY - (clientY - prev.y) * (newScale / prev.scale),
        };
      }
      return prev;
    });
  }, [minScale, maxScale]);

  return { viewport, setViewport, handlePan, handleZoom };
}
