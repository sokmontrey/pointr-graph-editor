import {Vec2} from "../utils/vector.ts";
import React, {useCallback, useEffect} from "react";
import {getMousePosition} from "../utils/mouse.ts";
import {EventBus} from "./useEventBus.ts";
import {ViewportState} from "../stores/canvas/viewportStore.ts";

export const useEventHandler = (
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    eventBus: EventBus,
    viewport: ViewportState,
    dragThreshold = 5,
) => {
    const {publish} = eventBus;

    const [mouseDownPos, setMouseDownPos] = React.useState<Vec2 | null>(null);
    const [isMouseDown, setIsMouseDown] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);

    const handleMouseDown = useCallback((e: MouseEvent) => {
        e.preventDefault();
        setIsMouseDown(true);
        setMouseDownPos(getMousePosition(e, viewport.offset, viewport.scale));
    }, [viewport]);

    const handleMouseUp = useCallback((e: MouseEvent) => {
        e.preventDefault();
        if (!isDragging) {
            publish('click', {
                mousePos: getMousePosition(e, viewport.offset, viewport.scale),
                buttons: e.buttons,
            });
        }
        setIsMouseDown(false);
        setIsDragging(false);
    }, [isDragging, publish, viewport]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        e.preventDefault();
        if (isMouseDown && !isDragging) {
            if (mouseDownPos === null) {
                return;
            }
            const currentMousePos = getMousePosition(e, viewport.offset, viewport.scale);
            const changeInMousePos = currentMousePos.subtract(mouseDownPos).absolute();
            if (changeInMousePos.x >= dragThreshold || changeInMousePos.y >= dragThreshold) {
                setIsDragging(true);
            }
        }

        if (isDragging) {
            publish('dragging', {
                mousePos: getMousePosition(e, viewport.offset, viewport.scale),
                movement: new Vec2(e.movementX, e.movementY),
                buttons: e.buttons,
            });
        } else {
            publish('mousemove', {
                mousePos: getMousePosition(e, viewport.offset, viewport.scale),
                movement: new Vec2(e.movementX, e.movementY),
            });
        }
    }, [isMouseDown, isDragging, mouseDownPos, viewport, dragThreshold, publish]);

    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        publish('wheel', {
            mousePos: getMousePosition(e, viewport.offset, viewport.scale),
            deltaY: e.deltaY,
        });
    }, [publish, viewport]);

    const handleContextMenu = useCallback((e: MouseEvent) => {
        e.preventDefault();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('wheel', handleWheel);
        canvas.addEventListener('contextmenu', handleContextMenu);

        // TODO: Keyboard event as well
        // TODO: separate concerns

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('wheel', handleWheel);
            canvas.removeEventListener('contextmenu', handleContextMenu);
        };
    }, [
        canvasRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleWheel,
        dragThreshold,
        handleContextMenu
    ]);

    return {
        isDragging,
        isMouseDown,
        mouseDownPos,
    }
};

