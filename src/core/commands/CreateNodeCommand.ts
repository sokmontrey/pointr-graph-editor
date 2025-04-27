import {NodeType} from "../../domain/graph";
import {Vec2} from "../../utils/vector.ts";
import {ICommand} from "./ICommand.ts";
import {NodeStore, NodeSeedStore, EdgeStore} from "../../stores/graph";

class CreateNodeCommand implements ICommand {
    private nodeId: string | null = null;
    private connectedNodes: string[] = [];

    constructor(
        private nodeType: NodeType,
        private position: Vec2,
        private nodeSeedStore: NodeSeedStore,
        private nodeStore: NodeStore,
        private edgeStore: EdgeStore,
    ) { }

    execute() {
        const label = this.nodeSeedStore.next(this.nodeType.key);
        this.nodeId = this.nodeStore.addNode(label.toString(), this.position, this.nodeType, this.nodeId);
        this.connectedNodes = this.edgeStore.edges
            .filter(edge => edge.from === this.nodeId || edge.to === this.nodeId)
            .map(edge => edge.from === this.nodeId ? edge.to : edge.from); // TODO: reuse this
        this.connectedNodes.forEach(otherNodeId => {
            this.edgeStore.addEdge(this.nodeId!, otherNodeId);
        });
    }

    undo() {
        if (!this.nodeId) {
            return;
        }

        this.nodeStore.removeNode(this.nodeId);
        this.nodeSeedStore.decrement(this.nodeType.key);
        this.edgeStore.removeEdgesConnectedToNode(this.nodeId);
    }
}

export default CreateNodeCommand;