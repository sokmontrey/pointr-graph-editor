import {useEdgeStore, useNodeStore} from "../../stores/graph";
import {ICommand} from "./ICommand.ts";
import {GraphNode} from "../../domain/graph";

class DeleteNodeCommand implements ICommand {
    private connectedNodes: string[];
    private node: GraphNode | null;

    constructor(
        private nodeId: string,
    ) {
        this.node = useNodeStore.getState().find(nodeId);
        this.connectedNodes = useEdgeStore.getState().getConnectedNodes(nodeId);
    }

    execute() {
        useNodeStore.getState().removeNode(this.nodeId);
        useEdgeStore.getState().removeEdgesConnectedToNode(this.nodeId);
    }

    undo() {
        if (!this.node) {
            return;
        }

        useNodeStore.getState().addNode(
            this.node.label,
            this.node.position,
            this.node.type,
            this.nodeId);

        const edgeStore = useEdgeStore.getState();
        this.connectedNodes.forEach(otherNodeId => {
            edgeStore.addEdge(this.nodeId, otherNodeId);
        });
    }
}

export default DeleteNodeCommand;