import {useSelectionStore} from "../../stores/main/selectionStore.ts";
import {Delete02Icon, Edit02Icon} from "@hugeicons/core-free-icons";
import {GraphNode} from "../../domain/graph";
import {useEffect, useState} from "react";
import {useNodeStore} from "../../stores/graph";
import IconButton from "../ui/IconButton.tsx";
import Input from "../ui/Input.tsx";
import {motion, AnimatePresence} from "motion/react";

const NodeControl = () => {
    const {
        entity: selectedEntity,
        delete: deleteEntity,
        type
    } = useSelectionStore();
    const [label, setLabel] = useState('');

    const isValidLabel = () => {
        if (!selectedEntity || type !== 'node') {
            return false;
        }

        if (label.trim() === '') {
            return false;
        }

        return label !== (selectedEntity as GraphNode).label;
    };

    const handleUpdateLabel = () => {
        if (!isValidLabel()) {
            return;
        }
        const node = selectedEntity as GraphNode;
        useNodeStore.getState().updateNodeLabel(node.id, label);
    };

    useEffect(() => {
        if (!selectedEntity || type !== 'node') {
            setLabel('');
            return;
        }
        const node = selectedEntity as GraphNode;
        setLabel(node.label);
    }, [selectedEntity, type]);

    return <div className="flex flex-row gap-1 bg-gray-100 rounded-xl p-1 shadow-lg ">
        <div>
            <IconButton
                icon={Delete02Icon}
                onClick={deleteEntity}
                disabled={!selectedEntity}
                size="md"
            />
        </div>

        <AnimatePresence>
            {type && type === 'node' && <>
                <motion.div
                    key="node-input-control"
                    initial={{opacity: 0, scale: 0.9, width: 0}}
                    animate={{opacity: 1, scale: 1, width: 'auto'}}
                    exit={{opacity: 0, scale: 0.9, width: 0}}
                    transition={{duration: 0.3}}
                    style={{overflow: 'hidden', display: 'flex'}}
                >
                    <Input
                        label="Label"
                        value={label}
                        onChange={e => setLabel(e.target.value)}
                    />
                </motion.div>
            </>}
        </AnimatePresence>

        <AnimatePresence>
            {type && type === 'node' && isValidLabel() &&
                <motion.div
                    key="node-update-button"
                    initial={{opacity: 0, scale: 0.9, width: 0}}
                    animate={{opacity: 1, scale: 1, width: 'auto'}}
                    exit={{opacity: 0, scale: 0.9, width: 0}}
                    transition={{duration: 0.3}}
                    style={{overflow: 'hidden', display: 'flex'}}
                >
                    <IconButton
                        icon={Edit02Icon}
                        onClick={handleUpdateLabel}
                        disabled={!isValidLabel()}
                        size="md"
                    />
                </motion.div>
            }
        </AnimatePresence>
    </div>;
};

export default NodeControl;