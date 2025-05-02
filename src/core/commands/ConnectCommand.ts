import {ICommand} from "./ICommand.ts";
import {useEdgeStore} from "../../stores/graph";

class ConnectCommand implements ICommand {
    private edgeId: string | null = null;

    constructor(
        private fromId: string,
        private toId: string,
    ) {
    }

    execute() {
        this.edgeId = useEdgeStore.getState().addEdge(this.fromId, this.toId);
        if (this.edgeId === null) {
            return;
        } // TODO: error message handling
    }

    undo() {
        if (this.edgeId) {
            useEdgeStore.getState().removeEdge(this.edgeId);
        }
    }
}

export default ConnectCommand;