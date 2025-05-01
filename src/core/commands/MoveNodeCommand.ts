import {ICommand} from "./ICommand.ts";
import {Vec2} from "../../utils/vector.ts";
import {useNodeStore} from "../../stores/graph";

class MoveNodeCommand implements ICommand {
    constructor(
        private nodeId: string,
        private oldPosition: Vec2,
        private newPosition: Vec2,
    ) { }

    execute() {
        useNodeStore.getState().moveNode(this.nodeId, this.newPosition);
    }

    undo() {
        useNodeStore.getState().moveNode(this.nodeId, this.oldPosition);
    }
}

export default MoveNodeCommand;