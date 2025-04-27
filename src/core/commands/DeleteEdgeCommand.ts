import {EdgeStore} from "../../stores/graph";
import {ICommand} from "./ICommand.ts";
import {GraphEdge} from "../../domain/graph";

class DeleteEdgeCommand implements ICommand {
    private edge: GraphEdge;

    constructor(
        private edgeId: string,
        private edgeStore: EdgeStore,
    ) {
        this.edge = this.edgeStore.edges.find(edge => edge.id === edgeId)!;
    }

    execute() {
        this.edgeStore.removeEdge(this.edgeId);
    }

    undo() {
        this.edgeStore.addEdge(
            this.edge.from,
            this.edge.to,
            this.edgeId
        );
    }
}

export default DeleteEdgeCommand;