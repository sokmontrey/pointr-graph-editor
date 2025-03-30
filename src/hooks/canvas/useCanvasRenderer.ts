import { useCallback, useEffect, RefObject } from 'react';
import { RenderFunction } from '../../types/Canvas';
import { ViewportManager } from '../../types';

export const useCanvasRenderer = (
    canvasRef: RefObject<HTMLCanvasElement | null>,
    viewportManager: ViewportManager,
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
        ctx.translate(viewportManager.viewport.x, viewportManager.viewport.y);
        ctx.scale(viewportManager.viewport.scale, viewportManager.viewport.scale);
        render(ctx);
        ctx.restore();
    }, [canvasRef, viewportManager, render]);

    useEffect(() => { draw(); }, [draw]);
    return { draw };
};
