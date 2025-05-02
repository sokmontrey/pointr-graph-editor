import {useSelectionStore} from "../../stores/main/selectionStore.ts";
import {GraphNode} from "../../domain/graph";
import {useEffect, useState} from "react";
import {useNodeStore} from "../../stores/graph";

const ReferenceNodeControl = () => {
    const {entity, type} = useSelectionStore();
    const [label, setLabel] = useState('');
    const [isReferenceNode, setIsReferenceNode] = useState<boolean>(false);

    const handleUpdateLabel = () => {
        if (!entity || type !== 'node') {
            return;
        }

        if (label.trim() === '') {
            return;
        }

        const node = entity as GraphNode;
        useNodeStore.getState().updateNodeLabel(node.id, label);
    };

    useEffect(() => {
        if (!entity || type !== 'node') {
            setLabel('');
            return;
        }
        const node = entity as GraphNode;
        setLabel(node.label);
        setIsReferenceNode(node.type.key === "ReferenceNode");
    }, [entity, type]);

    return <>
        {type && type === 'node' && isReferenceNode &&
            <div>
                <label>
                    Label:
                    <input
                        type="text"
                        value={label}
                        onChange={e => setLabel(e.target.value)}
                    />
                </label>

                <button onClick={handleUpdateLabel}>
                    Update
                </button>
            </div>
        }
    </>;
};

export default ReferenceNodeControl;