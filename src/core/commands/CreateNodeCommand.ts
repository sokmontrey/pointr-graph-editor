import {NodeType} from "../../domain/graph";
import {Vec2} from "../../utils/vector.ts";
import {ICommand} from "./Command.ts";
import StoresSingleton from "../SingletonStores.ts";

class CreateNodeCommand implements ICommand{
    private nodeType: NodeType;
    private position: Vec2;
    private nodeId!: string;

    constructor(nodeType: NodeType, position: Vec2) {
        this.nodeType = nodeType;
        this.position = position; // TODO: get grid store to snap to grid
    }

    execute() {
        const id = StoresSingleton.nodeSeedStore.getId(this.nodeType.name);
        this.nodeId = id.toString();
        StoresSingleton.nodeStore.addNode(this.nodeId, this.position, this.nodeType);
        StoresSingleton.nodeSeedStore.incrementSeed(this.nodeType.name);
    }

    undo(): void {
        StoresSingleton.nodeStore.removeNode(this.nodeId);
        StoresSingleton.nodeSeedStore.decrementSeed(this.nodeType.name);
    }
}

export default CreateNodeCommand;