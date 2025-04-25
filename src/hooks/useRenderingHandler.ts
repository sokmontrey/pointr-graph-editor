import {useCallback, useEffect, RefObject} from 'react';
import {RenderingBus} from "./useRenderingBus.ts";
import {ViewportState} from "../stores/viewportStore.ts";

export interface CanvasRenderer {
    draw: () => void;
}

export const useRenderingHandler = (
    canvasRef: RefObject<HTMLCanvasElement | null>,
    renderingBus: RenderingBus,
    viewport: ViewportState,
): CanvasRenderer => {
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(viewport.offset.x, viewport.offset.y);
        ctx.scale(viewport.scale, viewport.scale);
        renderingBus.publish(ctx);
        ctx.restore();
    }, [canvasRef, renderingBus, viewport]);

    useEffect(() => {
        const frameId = requestAnimationFrame(() => {
            draw();
        });
        return () => cancelAnimationFrame(frameId);
    }, [draw]);

    return {
        draw,
    };
};
