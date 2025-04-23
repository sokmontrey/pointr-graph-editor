import React from "react";
import {SelectMode} from "../../domain/modes";
import {useModeStore} from "../../stores/modeStore.ts";

const ModeControl: React.FC = () => {
    const {setMode} = useModeStore();
    // const firstNodeType = Object.keys(nodeTypes)[0];
    // const [nodeType, setNodeType] = useState<string>(firstNodeType);

    return (<div>
        <button
            onClick={() => setMode(new SelectMode())}>
            Select
        </button>

        {/*<select*/}
        {/*    value={nodeType}*/}
        {/*    onChange={(e) => {*/}
        {/*        setNodeType(e.target.value);*/}
        {/*        setMode(useCreateNodeMode(nodeTypes[e.target.value]));*/}
        {/*    }}>*/}
        {/*    {Object.keys(nodeTypes).map((key) =>*/}
        {/*        <option*/}
        {/*            key={key}*/}
        {/*            value={key}>*/}
        {/*            {nodeTypes[key].name}*/}
        {/*        </option>*/}
        {/*    )}*/}
        {/*</select>*/}

        {/*<button*/}
        {/*    onClick={() => setMode(useCreateNodeMode(nodeTypes[nodeType]))}>*/}
        {/*    {nodeTypes[nodeType].name}*/}
        {/*</button>*/}
    </div>);
};

export default ModeControl;

