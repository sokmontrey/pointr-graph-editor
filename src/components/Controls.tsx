import React from "react";
import Toolbar from "./Toolbar";
import { Mode } from "../types";

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