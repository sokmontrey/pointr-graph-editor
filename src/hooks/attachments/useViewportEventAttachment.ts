import {useEffect} from "react";
import {EventBus, MouseButton} from "../useEventBus.ts";
import {ViewportAction} from "../../stores/viewportStore.ts";

export const useViewportEventAttachment = (eventBus: EventBus, viewport: ViewportAction) => {
    useEffect(() => {
        const unsubscribeZoom = eventBus.subscribe('wheel', ({deltaY, mousePos}) => {
            const factor = deltaY > 0 ? 0.9 : 1.1;
            viewport.zoom(factor, mousePos);
        });

        const unsubscribePan = eventBus.subscribe('dragging', ({movement, buttons}) => {
            if (buttons === MouseButton.Middle) {
                viewport.pan(movement);
            }
        });

        return () => {
            unsubscribeZoom();
            unsubscribePan();
        };
    }, [eventBus, viewport]);
};