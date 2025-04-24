import React, {useState} from "react";
import {SelectMode} from "../../domain/modes";
import {useModeStore} from "../../stores/modeStore.ts";
import {NodeType, nodeTypes} from "../../domain/graph/node.ts";
import {CreateMode} from "../../domain/modes";

const ModeControl: React.FC = () => {
    const {setMode} = useModeStore();
    const [nodeType, setNodeType] = useState<NodeType>(nodeTypes.PathNode);

    const switchToCreateMode = () => {
        setMode(new CreateMode(nodeType));
    };

    const handleCreateModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNodeType(nodeTypes[e.target.value]);
        switchToCreateMode();
    };

    return (<div>
        <button
            onClick={() => setMode(new SelectMode())}>
            Select
        </button>

        <select
            value={nodeType.name}
            onChange={handleCreateModeChange}
        >
            {Object.keys(nodeTypes).map((key) =>
                <option
                    key={key}
                    value={key}>
                    {nodeTypes[key].name}
                </option>
            )}
        </select>

        <button
            onClick={switchToCreateMode}>
            {nodeType.name}
        </button>
    </div>);
};

export default ModeControl;

