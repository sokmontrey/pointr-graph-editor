import { RefObject, useEffect } from 'react';
import { EventBus } from '../../types';

export const useCanvasInteraction = (
    canvasRef: RefObject<HTMLCanvasElement | null>,
    eventBus: EventBus,
    dragThreshold = 5,
) => {
    let startX: number | null = null;
    let startY: number | null = null;
    let isMouseDown = false;
    let isDragging = false;

    const handleMouseDown = (e: MouseEvent) => {
        isMouseDown = true;
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
    };

    const handleMouseUp = (e: MouseEvent) => {
        isMouseDown = false;
        if (isDragging) {
            isDragging = false;
        } else {
            eventBus.publish('click', e);
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            eventBus.publish('dragging', e);
        } else {
            eventBus.publish('mousemove', e);
        }

        if (!isMouseDown) return;
        if (startX === null || startY === null) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.abs(dx) < dragThreshold && Math.abs(dy) < dragThreshold) return;
        isDragging = true;
    };

    const handleWheel = (e: WheelEvent) => {
        eventBus.publish('wheel', e);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('wheel', handleWheel);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('wheel', handleWheel);
        };
    }, [canvasRef, dragThreshold, eventBus]);
};
