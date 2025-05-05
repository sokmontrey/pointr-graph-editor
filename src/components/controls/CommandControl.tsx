import {useCommandStore} from "../../stores/main";
import React from "react";
import IconButton from "../ui/IconButton.tsx";
import {RedoIcon, UndoIcon} from "@hugeicons/core-free-icons";

const CommandControl = (): React.ReactElement => {
    const {undoStack, redoStack, undo, redo} = useCommandStore();

    return (
        <div className="flex flex-row gap-1 bg-gray-100 rounded-xl p-1 shadow-lg ">
            <IconButton
                icon={UndoIcon}
                onClick={undo}
                size="md"
                disabled={undoStack.length === 0}
            />
            <IconButton
                icon={RedoIcon}
                onClick={redo}
                size="md"
                disabled={redoStack.length === 0}
            />
        </div>
    );
};

export default CommandControl;