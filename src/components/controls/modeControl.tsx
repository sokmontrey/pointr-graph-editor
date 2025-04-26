import React, {useRef, useState} from "react";
import {SelectMode} from "../../domain/modes";
import {useCommandStore, useModeStore} from "../../stores/main";
import {NodeType, nodeTypes} from "../../domain/graph";
import {CreateNodeMode} from "../../domain/modes";
import {useGridStore} from "../../stores/canvas";
import CommandFactory from "../../core/commands/CommandFactory.ts";
import {useEdgeStore, useNodeSeedStore, useNodeStore} from "../../stores/graph";
import {ConnectMode} from "../../domain/modes";

const ModeControl: React.FC = () => {
    const {mode, setMode} = useModeStore();
    const [nodeType, setNodeType] = useState<NodeType>(nodeTypes.PathNode);

    const gridStore = useGridStore();
    const nodeSeedStore = useNodeSeedStore();
    const nodeStore = useNodeStore();
    const edgeStore = useEdgeStore();

    const commandStore = useCommandStore();
    const commandFactory = useRef<CommandFactory>(new CommandFactory(
        nodeSeedStore,
        nodeStore,
        edgeStore,
    ));

    const switchToSelectMode = () => {
        setMode(new SelectMode(
            nodeStore,
            edgeStore,
        ));
    }

    const switchToConnectMode = () => {
        setMode(new ConnectMode(
            nodeStore,
            commandStore,
            commandFactory.current,
        ));
    };

    const switchToCreateMode = (nodeType: NodeType) => {
        setNodeType(nodeType);
        setMode(new CreateNodeMode(
            nodeType,
            gridStore,
            commandStore,
            commandFactory.current,
        ));
    };

    return (<div>
        <p>{mode.name}</p>

        <button onClick={switchToSelectMode}>
            Select
        </button>

        <button onClick={() => switchToConnectMode()}>
            Connect
        </button>

        <select
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

