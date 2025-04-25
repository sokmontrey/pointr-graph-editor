import React, {useState} from "react";
import {SelectMode} from "../../domain/modes";
import {useModeStore} from "../../stores/main/modeStore.ts";
import {NodeType, nodeTypes} from "../../domain/graph/node.ts";
import {CreateMode} from "../../domain/modes";

const ModeControl: React.FC = () => {
    const {mode, setMode} = useModeStore();
    const [nodeType, setNodeType] = useState<NodeType>(nodeTypes.PathNode);

    const switchToCreateMode = (type: NodeType) => {
        setNodeType(type);
        setMode(new CreateMode(type));
    };

    return (<div>
        <p>{mode.name}</p>

        <button onClick={() => setMode(new SelectMode())}>
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

