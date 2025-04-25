import {useEffect} from "react";
import {EventBus, EventPropMap, MouseButton} from "../event";
import {ViewportAction} from "../../stores/canvas";

export const useViewportEventAttachment = (eventBus: EventBus, viewport: ViewportAction) => {
    useEffect(() => {
        const handleZoom = ({deltaY, mousePos}: EventPropMap['wheel']) => {
            const factor = deltaY > 0 ? 0.9 : 1.1;
            viewport.zoom(factor, mousePos);
        };

        const handlePan = ({movement, buttons}: EventPropMap['dragging']) => {
            if (buttons === MouseButton.Middle) {
                viewport.pan(movement);
            }
        };

        const unsubscribes = [
            eventBus.subscribe('wheel', handleZoom),
            eventBus.subscribe('dragging', handlePan),
        ];

        return () => {
            unsubscribes.forEach((unsubscribe) => unsubscribe());
        };
    }, [eventBus, viewport]);
};