import {useEffect} from "react";
import {EventBus, EventPropMap} from "../event";
import {ModeStore} from "../../stores/main";
import {ConnectMode, CreateNodeMode, Mode, SelectMode} from "../../domain/modes";
import {nodeTypes} from "../../domain/graph";

export const useModeEventAttachment = (eventBus: EventBus, modeStore: ModeStore) => {
    useEffect(() => {
        const keyModeMap: Record<string, () => Mode> = {
            'KeyV': () => new SelectMode(),
            'KeyC': () => new ConnectMode(),
            'KeyR': () => new CreateNodeMode(nodeTypes.RoomNode),
            'KeyA': () => new CreateNodeMode(nodeTypes.PathNode),
            'KeyF': () => new CreateNodeMode(nodeTypes.ReferenceNode),
        };

        const handleKeypress = ({ key }: EventPropMap['keypress']) => {
            if (key in keyModeMap) {
                modeStore.setMode(keyModeMap[key]());
            }
        };

        const unsubscribes = [
            eventBus.subscribe('click', modeStore.mode.handleClick.bind(modeStore.mode)),
            eventBus.subscribe('dragging', modeStore.mode.handleDragging.bind(modeStore.mode)),
            eventBus.subscribe('mousemove', modeStore.mode.handleMouseMove.bind(modeStore.mode)),
            eventBus.subscribe('mouseup', modeStore.mode.handleMouseUp.bind(modeStore.mode)),
            eventBus.subscribe('keypress', handleKeypress),
        ];

        return () => {
            unsubscribes.forEach((unsubscribe) => unsubscribe());
        };
    }, [eventBus, modeStore]);
};
