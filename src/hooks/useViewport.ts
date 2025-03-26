import { useState } from 'react';
import { Viewport } from '../types/Viewport';

export const useViewport = (initialScale = 1) => {
  const [viewport, setViewport] = useState<Viewport>({
    x: 0,
    y: 0,
    scale: initialScale,
  });

  const pan = (dx: number, dy: number) => {
    setViewport(prev => ({
      ...prev,
      x: prev.x + dx,
      y: prev.y + dy,
    }));
  };

  const zoom = (factor: number, centerX: number, centerY: number) => {
    setViewport(prev => {
      const newScale = prev.scale * factor;
      // Adjust position to zoom toward mouse position
      return {
        scale: newScale,
        x: centerX - (centerX - prev.x) * factor,
        y: centerY - (centerY - prev.y) * factor,
      };
    });
  };

  return { viewport, setViewport, pan, zoom };
};