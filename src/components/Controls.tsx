import React from "react";
import { Mode } from "../types/Mode";
import Toolbar from "./Toolbar";

interface ControlsProps {
    setMode: React.Dispatch<React.SetStateAction<Mode>>
}

const Controls = ({
    setMode,
}: ControlsProps) => {
    return (<div>
        <Toolbar 
            setMode={setMode} 
        />
    </div>);
};

export default Controls;