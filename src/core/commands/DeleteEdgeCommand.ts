import {useEdgeStore} from "../../stores/graph";
import {ICommand} from "./ICommand.ts";
import {GraphEdge} from "../../domain/graph";

class DeleteEdgeCommand implements ICommand {
    private edge: GraphEdge;

    constructor(
        private edgeId: string,
    ) {
        const edgeStore = useEdgeStore.getState();
        this.edge = edgeStore.edges.find(edge => edge.id === edgeId)!;
    }

    execute() {
        const edgeStore = useEdgeStore.getState();
        edgeStore.removeEdge(this.edgeId);
    }

    undo() {
        const edgeStore = useEdgeStore.getState();

        edgeStore.addEdge(
            this.edge.from,
            this.edge.to,
            this.edgeId
        );
    }
}

export default DeleteEdgeCommand;