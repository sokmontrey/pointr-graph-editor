import React, {useState} from "react";
import {useModeStore} from "../../stores/main";
import {NodeType, nodeTypes} from "../../domain/graph";
import SelectMode from "../../domain/modes/SelectMode.ts";
import ConnectMode from "../../domain/modes/ConnectMode.ts";
import CreateNodeMode from "../../domain/modes/CreateNodeMode.ts";
import {BendToolIcon, Cursor02Icon} from "@hugeicons/core-free-icons";
import IconButton from "../ui/IconButton.tsx";
import DropdownButton from "../ui/DropdownButton.tsx";

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

    return (
        <div className="flex flex-row gap-1 bg-gray-100 rounded-xl p-1 shadow-lg ">
            <IconButton
                icon={Cursor02Icon}
                onClick={switchToSelectMode}
                active={mode instanceof SelectMode}
                size="md"
            />

            <IconButton
                icon={BendToolIcon}
                onClick={switchToConnectMode}
                active={mode instanceof ConnectMode}
                size="md"
            />

            <DropdownButton
                items={Object.entries(nodeTypes).map(([key, value]) => ({
                    key,
                    value,
                    name: value.name
                }))}
                selectedItem={nodeType}
                onSelect={switchToCreateMode}
                getIcon={(item) => item.icon || Cursor02Icon}
                isActive={mode instanceof CreateNodeMode}
                size="md"
            />
        </div>
    );
};

export default ModeControl;

