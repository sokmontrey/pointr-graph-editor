import { useEffect, useState } from "react";
import useCreateNodeMode from "../hooks/mode/useCreateNodeMode";
import useSelectMode from "../hooks/mode/useSelectMode";
import { Mode } from "../types/Mode";
import { nodeTypes } from "../cores/graph/Node"; 

interface ToolbarProps {
    setMode: React.Dispatch<React.SetStateAction<Mode>>
}

const Toolbar = ({
    setMode
}: ToolbarProps) => {
    const firstNodeType = Object.keys(nodeTypes)[0];
    const [nodeType, setNodeType] = useState<string>(firstNodeType);

    return (<div>
        <button 
        onClick={() => setMode(useSelectMode())} >
            Select
        </button>

        <select 
        value={nodeType}
        onChange={(e) => {
            setNodeType(e.target.value);
            setMode(useCreateNodeMode(nodeTypes[e.target.value]));
        }}>
            {Object.keys(nodeTypes).map((key) =>
                <option 
                key={key} 
                value={key}>
                    {nodeTypes[key].name}
                </option>
            )}
        </select>

        <button 
        onClick={() => setMode(useCreateNodeMode(nodeTypes[nodeType]))}>
            {nodeTypes[nodeType].name}
        </button>
    </div>);
};

export default Toolbar;

