import {NodeType} from "../../domain/graph";
import {Vec2} from "../../utils/vector.ts";
import {ICommand} from "./ICommand.ts";
import {useEdgeStore, useNodeSeedStore, useNodeStore} from "../../stores/graph";

class CreateNodeCommand implements ICommand {
    private nodeId: string | null = null;
    private connectedNodes: string[] = [];

    constructor(
        private nodeType: NodeType,
        private position: Vec2,
    ) { }

    execute() {
        const nodeStore = useNodeStore.getState();
        const nodeSeedStore = useNodeSeedStore.getState();

        const label = nodeSeedStore.next(this.nodeType.key);
        this.nodeId = nodeStore.addNode(label.toString(), this.position, this.nodeType, this.nodeId);
        this.reconnectEdges(this.nodeId);
    }

    private reconnectEdges(nodeId: string) {
        const edgeStore = useEdgeStore.getState();
        this.connectedNodes = edgeStore.getConnectedNodes(nodeId);
        this.connectedNodes.forEach(otherNodeId => {
            edgeStore.addEdge(this.nodeId!, otherNodeId);
        });
    }

    undo() {
        if (!this.nodeId) {
            return;
        }

        const edgeStore = useEdgeStore.getState();
        const nodeStore = useNodeStore.getState();
        const nodeSeedStore = useNodeSeedStore.getState();

        nodeStore.removeNode(this.nodeId);
        nodeSeedStore.decrement(this.nodeType.key);
        edgeStore.removeEdgesConnectedToNode(this.nodeId);
    }
}

export default CreateNodeCommand;