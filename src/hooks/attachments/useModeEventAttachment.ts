import {useEffect} from "react";
import {EventBus} from "../useEventBus.ts";
import {ModeState} from "../../stores/main/modeStore.ts";

export const useModeEventAttachment = (eventBus: EventBus, mode: ModeState) => {
    useEffect(() => {
        const unsubscribes = [
            eventBus.subscribe('click', mode.mode.handleClick.bind(mode.mode)),
            eventBus.subscribe('dragging', mode.mode.handleDragging.bind(mode.mode)),
            eventBus.subscribe('mousemove', mode.mode.handleMouseMove.bind(mode.mode)),
        ];

        return () => {
            unsubscribes.forEach((unsubscribe) => unsubscribe());
        };
    }, [eventBus, mode]);
};
