import {ICommand} from "./ICommand.ts";
import {EdgeStore} from "../../stores/graph";

class ConnectCommand implements ICommand {
    private edgeId: string | null = null;

    constructor(
        private fromId: string,
        private toId: string,
        private edgeStore: EdgeStore,
    ) {
    }

    execute() {
        this.edgeId = this.edgeStore.addEdge(this.fromId, this.toId);
        if (this.edgeId === null) {
            return;
        } // TODO: error message handling
    }

    undo() {
        if (this.edgeId) {
            this.edgeStore.removeEdge(this.edgeId);
        }
    }
}

export default ConnectCommand;