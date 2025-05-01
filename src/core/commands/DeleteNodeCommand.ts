import {useEdgeStore, useNodeStore} from "../../stores/graph";
import {ICommand} from "./ICommand.ts";
import {GraphNode} from "../../domain/graph";

class DeleteNodeCommand implements ICommand {
    private connectedNodes: string[];
    private node: GraphNode;

    constructor(
        private nodeId: string,
    ) {
        const nodeStore = useNodeStore.getState();
        const edgeStore = useEdgeStore.getState();

        this.node = nodeStore.nodes
            .find(node => node.id === nodeId)!;

        this.connectedNodes = edgeStore.edges
            .filter(edge => edge.from === nodeId || edge.to === nodeId)
            .map(edge => edge.from === nodeId ? edge.to : edge.from);
    }

    execute() {
        const nodeStore = useNodeStore.getState();
        const edgeStore = useEdgeStore.getState();

        nodeStore.removeNode(this.nodeId);
        edgeStore.removeEdgesConnectedToNode(this.nodeId);
    }

    undo() {
        const nodeStore = useNodeStore.getState();
        const edgeStore = useEdgeStore.getState();

        nodeStore.addNode(
            this.node.label,
            this.node.position,
            this.node.type,
            this.nodeId);

        this.connectedNodes.forEach(nodeId => {
            edgeStore.addEdge(this.nodeId, nodeId);
        });
    }
}

export default DeleteNodeCommand;