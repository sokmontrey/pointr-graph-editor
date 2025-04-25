import {EdgeStore, NodeSeedStore, NodeStore} from "../../stores/graph";

abstract class Command {
    protected nodeStore!: NodeStore;
    protected edgeStore!: EdgeStore;
    protected nodeSeedStore!: NodeSeedStore;

    setNodeStore(nodeStore: NodeStore) {
        this.nodeStore = nodeStore;
    }

    setEdgeStore(edgeStore: EdgeStore) {
        this.edgeStore = edgeStore;
    }

    setNodeSeedStore(nodeSeedStore: NodeSeedStore) {
        this.nodeSeedStore = nodeSeedStore;
    }

    abstract execute(): void;

    abstract undo(): void;
}

export default Command;