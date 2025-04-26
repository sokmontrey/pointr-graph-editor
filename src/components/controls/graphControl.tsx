import {useSelectionStore} from "../../stores/main/selectionStore.ts";
import CommandFactory from "../../core/commands/CommandFactory.ts";
import {useEdgeStore, useNodeSeedStore, useNodeStore} from "../../stores/graph";
import {useRef} from "react";
import {useCommandStore} from "../../stores/main";

const GraphControl = () => {
    const {selected, selectionType} = useSelectionStore();
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
        if (!selected || !selectionType) {
            return;
        }

        const command = commandFactory.current.deleteCommand(
            selectionType,
            selected,
        );
        commandStore.execute(command);
    };

    return <div>
        <button
            onClick={handleDelete}
            disabled={!selected}
        >
            Delete
        </button>
    </div>;
};

export default GraphControl;