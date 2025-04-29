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
        const nodeStore = useNodeStore.getState();

        nodeStore.moveNode(this.nodeId, this.newPosition);
    }

    undo() {
        const nodeStore = useNodeStore.getState();

        nodeStore.moveNode(this.nodeId, this.oldPosition);
    }
}

export default MoveNodeCommand;