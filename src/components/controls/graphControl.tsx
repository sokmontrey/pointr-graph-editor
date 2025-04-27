import {useSelectionStore} from "../../stores/main/selectionStore.ts";
import CommandFactory from "../../core/commands/CommandFactory.ts";
import {useEdgeStore, useNodeSeedStore, useNodeStore} from "../../stores/graph";
import {useRef} from "react";
import {useCommandStore} from "../../stores/main";

const GraphControl = () => {
    const {entity: selectedEntity, type: selectionType} = useSelectionStore();
    const nodeSeedStore = useNodeSeedStore();
    const nodeStore = useNodeStore();
    const edgeStore = useEdgeStore();
    const commandStore = useCommandStore();

    const commandFactory = useRef<CommandFactory>(new CommandFactory(
        nodeSeedStore,
        nodeStore,
        edgeStore,
    ));

    const handleDelete = () => {
        if (!selectedEntity || !selectionType) {
            return;
        }

        const command = selectionType === "node"
            ? commandFactory.current.deleteNodeCommand(selectedEntity.id)
            : commandFactory.current.deleteEdgeCommand(selectedEntity.id);
        commandStore.execute(command);
    };

    return <div>
        <button
            onClick={handleDelete}
            disabled={!selectedEntity}
        >
            Delete
        </button>
    </div>;
};

export default GraphControl;