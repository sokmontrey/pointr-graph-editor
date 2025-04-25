import React from "react";
import DragNumberInput from "../ui/DragNumberInput.tsx";
import {useGridStore} from "../../stores/canvas/gridStore.ts";

const GridControl: React.FC = () => {
    const {
        gap,
        setGap
    } = useGridStore();

    return (<div>
        <DragNumberInput
            label="Grid Gap"
            value={gap}
            onChange={setGap}
            min={5}
            max={20}
            step={1}
            dragSensitivity={0.1}
        />
    </div>);
};

export default GridControl;
