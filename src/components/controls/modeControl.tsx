import React, {useState} from "react";
import {SelectMode} from "../../domain/modes";
import {useCommandStore, useModeStore} from "../../stores/main";
import {NodeType, nodeTypes} from "../../domain/graph";
import {CreateMode} from "../../domain/modes";
import {useGridStore} from "../../stores/canvas";

const ModeControl: React.FC = () => {
    const {mode, setMode} = useModeStore();
    const [nodeType, setNodeType] = useState<NodeType>(nodeTypes.PathNode);

    const commandStore = useCommandStore();
    const gridStore = useGridStore();

    const switchToSelectMode = () => {
        setMode(new SelectMode());
    }

    const switchToCreateMode = (nodeType: NodeType) => {
        setNodeType(nodeType);
        setMode(new CreateMode({
            nodeType,
            gridStore,
            commandStore,
        }));
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

