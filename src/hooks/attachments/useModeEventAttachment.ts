import {useEffect} from "react";
import {EventBus} from "../useEventBus.ts";
import {ModeState} from "../../stores/modeStore.ts";

export const useModeEventAttachment = (eventBus: EventBus, mode: ModeState) => {
    useEffect(() => {
        const unsubscribes = [
            eventBus.subscribe('click', mode.mode.handleClick),
            eventBus.subscribe('dragging', mode.mode.handleDragging),
            eventBus.subscribe('mousemove', mode.mode.handleMouseMove),
        ];

        return () => {
            unsubscribes.forEach((unsubscribe) => unsubscribe());
        };
    }, [eventBus, mode]);
};
