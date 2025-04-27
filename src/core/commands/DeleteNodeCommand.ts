import {EdgeStore, NodeStore} from "../../stores/graph";
import {ICommand} from "./ICommand.ts";
import {GraphNode} from "../../domain/graph";

class DeleteNodeCommand implements ICommand {
    private connectedNodes: string[];
    private node: GraphNode;

    constructor(
        private nodeId: string,
        private nodeStore: NodeStore,
        private edgeStore: EdgeStore,
    ) {
        this.node = this.nodeStore.nodes
            .find(node => node.id === nodeId)!;

        this.connectedNodes = this.edgeStore.edges
            .filter(edge => edge.from === nodeId || edge.to === nodeId)
            .map(edge => edge.from === nodeId ? edge.to : edge.from);
    }

    execute() {
        this.nodeStore.removeNode(this.nodeId);
        this.edgeStore.removeEdgesConnectedToNode(this.nodeId);
    }

    undo() {
        this.nodeStore.addNode(
            this.node.label,
            this.node.position,
            this.node.type,
            this.nodeId);

        this.connectedNodes.forEach(nodeId => {
            this.edgeStore.addEdge(this.nodeId, nodeId);
        });
    }
}

export default DeleteNodeCommand;