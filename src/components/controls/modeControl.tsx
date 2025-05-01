import React, {useState} from "react";
import {SelectMode} from "../../domain/modes";
import {useModeStore} from "../../stores/main";
import {NodeType, nodeTypes} from "../../domain/graph";
import {CreateNodeMode} from "../../domain/modes";
import {ConnectMode} from "../../domain/modes";

const ModeControl: React.FC = () => {
    const {mode, setMode} = useModeStore();
    const [nodeType, setNodeType] = useState<NodeType>(nodeTypes.PathNode);


    const switchToSelectMode = () => {
        setMode(new SelectMode());
    }

    const switchToConnectMode = () => {
        setMode(new ConnectMode());
    };

    const switchToCreateMode = (nodeType: NodeType) => {
        setNodeType(nodeType);
        setMode(new CreateNodeMode(nodeType));
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

