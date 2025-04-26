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
        const label = this.nodeSeedStore.next(this.nodeType.name);
        this.nodeStore.addNode(label.toString(), this.position, this.nodeType);
    }

    undo(): void {
        this.nodeStore.removeNode(this.nodeId);
    }
}

export default CreateNodeCommand;