import { RefObject, useEffect } from 'react';
import { CanvasInteraction, EventBus } from '../../types';
import { getMousePosition } from '../../utils/mouse';
import { Point } from '../../utils/point';

export const useCanvasInteraction = (
    canvasRef: RefObject<HTMLCanvasElement | null>,
    eventBus: EventBus,
    dragThreshold = 5,
): CanvasInteraction => {
    let mouseDownPos: Point | null = null;
    let isMouseDown = false;
    let isDragging = false;

    const handleMouseDown = (e: MouseEvent) => {
        isMouseDown = true;
        mouseDownPos = getMousePosition(e);
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (!isDragging) eventBus.publish('click', e);
        isMouseDown = false;
        isDragging = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isMouseDown && !isDragging) {
            if (mouseDownPos === null) return;
            const currentMousePos = getMousePosition(e);
            const changeInMousePos = currentMousePos.subtract(mouseDownPos).absolute();
            if (changeInMousePos.x >= dragThreshold || changeInMousePos.y >= dragThreshold) {
                isDragging = true;
            }
        }
        
        eventBus.publish(isDragging ? 'dragging' : 'mousemove', e);
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
