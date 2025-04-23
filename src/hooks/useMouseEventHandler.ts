import {Vec2} from "../utils/vector.ts";
import React, {useCallback, useEffect} from "react";
import {useMouseEventBus} from "./useMouseEventBus.ts";
import {getMousePosition} from "../utils/mouse.ts";

export const useMouseEventHandler = (
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    dragThreshold = 5,
) => {
    const eventBus = React.useRef(useMouseEventBus()).current;

    const [mouseDownPos, setMouseDownPos] = React.useState<Vec2 | null>(null); // Use useState
    const [isMouseDown, setIsMouseDown] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);

    const handleMouseDown = useCallback((e: MouseEvent) => {
        setIsMouseDown(true);
        setMouseDownPos(getMousePosition(e));
    }, []);

    const handleMouseUp = useCallback((e: MouseEvent) => {
        if (!isDragging) {
            eventBus.publish('click', e);
        }
        setIsMouseDown(false);
        setIsDragging(false);
    }, [isDragging, eventBus]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isMouseDown && !isDragging) {
            if (mouseDownPos === null) return;
            const currentMousePos = getMousePosition(e);
            const changeInMousePos = currentMousePos.subtract(mouseDownPos).absolute();
            if (changeInMousePos.x >= dragThreshold || changeInMousePos.y >= dragThreshold) {
                setIsDragging(true);
            }
        }

        eventBus.publish(isDragging ? 'dragging' : 'mousemove', e);
    }, [isMouseDown, isDragging, mouseDownPos, eventBus, dragThreshold]);

    const handleWheel = useCallback((e: WheelEvent) => {
        eventBus.publish('wheel', e);
    }, [eventBus]);

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
    }, [
        canvasRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleWheel,
        dragThreshold
    ]);
};

