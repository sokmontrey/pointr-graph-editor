import {useEdgeStore} from "../../stores/graph";
import {ICommand} from "./ICommand.ts";
import {GraphEdge} from "../../domain/graph";

class DeleteEdgeCommand implements ICommand {
    private edge: GraphEdge | null;

    constructor(
        private edgeId: string,
    ) {
        this.edge = useEdgeStore.getState()
            .find(edgeId);
    }

    execute() {
        useEdgeStore.getState()
            .removeEdge(this.edgeId);
    }

    undo() {
        if (!this.edge) {
            return;
        }
        useEdgeStore.getState()
            .addEdge(this.edge.from, this.edge.to, this.edgeId);
    }
}

export default DeleteEdgeCommand;