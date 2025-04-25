import {NodeType} from "../../domain/graph";
import {Vec2} from "../../utils/vector.ts";
import {ICommand} from "./ICommand.ts";
import {NodeStore, NodeSeedStore} from "../../stores/graph";

class CreateNodeCommand implements ICommand {
    private nodeId!: string;

    constructor(
        private nodeType: NodeType,
        private position: Vec2,
        private nodeSeedStore: NodeSeedStore,
        private nodeStore: NodeStore,
    ) { }

    execute() {
        const id = this.nodeSeedStore.getId(this.nodeType.name);
        this.nodeId = id.toString();
        this.nodeStore.addNode(this.nodeId, this.position, this.nodeType);
        this.nodeSeedStore.incrementSeed(this.nodeType.name);
    }

    undo(): void {
        this.nodeStore.removeNode(this.nodeId);
        this.nodeSeedStore.decrementSeed(this.nodeType.name);
    }
}

export default CreateNodeCommand;