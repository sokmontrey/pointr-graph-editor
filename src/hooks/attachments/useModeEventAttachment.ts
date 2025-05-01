import {useEffect} from "react";
import {EventBus, EventPropMap} from "../event";
import {ModeStore} from "../../stores/main";
import {nodeTypes} from "../../domain/graph";
import SelectMode from "../../domain/modes/SelectMode.ts";
import ConnectMode from "../../domain/modes/ConnectMode.ts";
import CreateNodeMode from "../../domain/modes/CreateNodeMode.ts";
import Mode from "../../domain/modes/Mode.ts";

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
