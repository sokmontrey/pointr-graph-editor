import {useCommandStore} from "../../stores/main";
import {useNodeStore} from "../../stores/graph";
import React from "react";

const CommandControl = (): React.ReactElement => {
    const {undoStack, redoStack, undo, redo} = useCommandStore();
    const {nodes} = useNodeStore();

    return (
        <div>
            {nodes.length}
            <button
                onClick={undo}
                disabled={undoStack.length === 0}
            >Undo</button>

            <button
                onClick={redo}
                disabled={redoStack.length === 0}
            >Redo</button>
        </div>
    );
};

export default CommandControl;