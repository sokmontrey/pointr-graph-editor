import {ICommand} from "./ICommand.ts";
import {Vec2} from "../../utils/vector.ts";
import {NodeStore} from "../../stores/graph";

class MoveNodeCommand implements ICommand {
    constructor(
        private nodeId: string,
        private oldPosition: Vec2,
        private newPosition: Vec2,
        private nodeStore: NodeStore,
    ) { }

    execute() {
        this.nodeStore.moveNode(this.nodeId, this.newPosition);
    }

    undo() {
        this.nodeStore.moveNode(this.nodeId, this.oldPosition);
    }
}

export default MoveNodeCommand;