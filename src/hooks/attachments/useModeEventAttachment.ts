import {useEffect} from "react";
import {EventBus, EventPropMap} from "../event";
import {ModeStore, useCommandStore} from "../../stores/main";
import {useEdgeStore, useNodeSeedStore, useNodeStore} from "../../stores/graph";
import CommandFactory from "../../core/commands/CommandFactory.ts";
import {useGridStore} from "../../stores/canvas";
import {useSelectionStore} from "../../stores/main/selectionStore.ts";
import {ConnectMode, CreateNodeMode, SelectMode} from "../../domain/modes";
import {nodeTypes} from "../../domain/graph";

export const useModeEventAttachment = (eventBus: EventBus, modeStore: ModeStore) => {
    const nodeStore = useNodeStore();
    const edgeStore = useEdgeStore();
    const commandStore = useCommandStore();
    const selectionStore = useSelectionStore();
    const gridStore = useGridStore();
    const nodeSeedStore = useNodeSeedStore();

    useEffect(() => {
        const commandFactory = new CommandFactory(
            nodeSeedStore,
            nodeStore,
            edgeStore,
        );
        const handleKeypress = ({ key }: EventPropMap['keypress']) => {
            switch (key) {
                case 'KeyV':
                    modeStore.setMode(
                        new SelectMode(
                            nodeStore,
                            edgeStore,
                            gridStore,
                            selectionStore,
                            commandStore,
                            commandFactory,
                        )
                    );
                    break;
                case 'KeyC':
                    modeStore.setMode(
                        new ConnectMode(
                            nodeStore,
                            commandStore,
                            commandFactory,
                        )
                    );
                    break;
                case 'KeyR':
                    modeStore.setMode(
                        new CreateNodeMode(
                            nodeTypes.RoomNode,
                            gridStore,
                            commandStore,
                            commandFactory,
                        )
                    );
                    break;
                case 'KeyA':
                    modeStore.setMode(
                        new CreateNodeMode(
                            nodeTypes.PathNode,
                            gridStore,
                            commandStore,
                            commandFactory,
                        )
                    );
                    break;
                case 'KeyF':
                    modeStore.setMode(
                        new CreateNodeMode(
                            nodeTypes.ReferenceNode,
                            gridStore,
                            commandStore,
                            commandFactory,
                        )
                    );
                    break;
                default:
                    break;
            }
        }; // TODO: refactor this somehow, someday.

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
    }, [commandStore, edgeStore, eventBus, gridStore, modeStore, nodeStore, selectionStore]);
};
