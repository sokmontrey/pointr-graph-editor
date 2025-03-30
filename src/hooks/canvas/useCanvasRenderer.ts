import { useCallback, useEffect, RefObject } from 'react';
import { ViewportTransform, RenderFunction } from '../../types/Canvas';

export const useCanvasRenderer = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  viewport: ViewportTransform,
  render: RenderFunction
) => {
  // Memoize the draw function 
  // And to expose it outside the hook
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(viewport.x, viewport.y);
    ctx.scale(viewport.scale, viewport.scale);
    render(ctx);
    ctx.restore();
  }, [canvasRef, viewport, render]);

  useEffect(() => { draw(); }, [draw]);

  return { draw };
};
