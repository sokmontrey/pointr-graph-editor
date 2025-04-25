import React, {useRef, useState} from "react";
import {SelectMode} from "../../domain/modes";
import {useModeStore} from "../../stores/main";
import {NodeType, nodeTypes} from "../../domain/graph";
import {CreateMode} from "../../domain/modes";
import {useGridStore} from "../../stores/canvas";
import {CommandManager} from "../../core/commands";
import CommandFactory from "../../core/commands/CommandFactory.ts";
import {useEdgeStore, useNodeSeedStore, useNodeStore} from "../../stores/graph";

const ModeControl: React.FC = () => {
    const {mode, setMode} = useModeStore();
    const [nodeType, setNodeType] = useState<NodeType>(nodeTypes.PathNode);

    const gridStore = useGridStore();
    const nodeSeedStore = useNodeSeedStore();
    const nodeStore = useNodeStore();
    const edgeStore = useEdgeStore();

    const commandManager = useRef<CommandManager>(new CommandManager());
    const commandFactory = useRef<CommandFactory>(new CommandFactory(
        nodeSeedStore,
        nodeStore,
        edgeStore,
    ));

    const switchToSelectMode = () => {
        setMode(new SelectMode());
    }

    const switchToCreateMode = (nodeType: NodeType) => {
        setNodeType(nodeType);
        setMode(new CreateMode(
            nodeType,
            gridStore,
            commandManager.current,
            commandFactory.current,
        ));
    };

    return (<div>
        <p>{mode.name}</p>

        <button onClick={switchToSelectMode}>
            Select
        </button>

        <select
            value={nodeType.name}
            onChange={e => switchToCreateMode(nodeTypes[e.target.value])}
        >
            {Object.entries(nodeTypes).map(([key, value]) =>
                <option key={key} value={key}>
                    {value.name}
                </option>
            )}
        </select>

        <button onClick={() => switchToCreateMode(nodeType)}>
            {nodeType.name}
        </button>
    </div>);
};

export default ModeControl;

