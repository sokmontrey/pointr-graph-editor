import { useState, useCallback } from 'react';
import { ViewportManager, ViewportSettings, ViewportTransform } from '../../types';

export const useViewportManager = ({
    initialX = 0,
    initialY = 0,
    initialScale = 1,
    minScale = 0.1,
    maxScale = 10,
}: ViewportSettings): ViewportManager => {
    const [viewport, setViewport] = useState<ViewportTransform>({
        x: initialX,
        y: initialY,
        scale: initialScale,
    });

    const handlePan = useCallback((e: MouseEvent) => {
        // TODO: check for keyboard (space or ctrl)
        if (e.buttons !== 4) return;
        const { movementX, movementY } = e;
        setViewport(prev => ({
            ...prev,
            x: prev.x + movementX,
            y: prev.y + movementY,
        }));
    }, []);

    const handleZoom = useCallback((e: WheelEvent) => {
        const { clientX, clientY, deltaY } = e;
        // TODO: refactor this
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const factor = deltaY > 0 ? 0.9 : 1.1;
        setViewport(prev => {
            const newScale = Math.max(minScale, Math.min(maxScale, prev.scale * factor));
            if (newScale !== prev.scale) {
                return {
                    scale: newScale,
                    x: x - (x - prev.x) * (newScale / prev.scale),
                    y: y - (y - prev.y) * (newScale / prev.scale),
                };
            }
            return prev;
        });
    }, [minScale, maxScale]);

    return { 
        viewport,
        setViewport, 
        handlePan, 
        handleZoom 
    };
}
