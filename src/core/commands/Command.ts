import {GraphStore} from "../../stores/graph";

abstract class Command {
    protected graphStore!: GraphStore;
    setGraphStore(graphStore: GraphStore): void {
        this.graphStore = graphStore;
    }

    abstract execute(): void;
    abstract undo(): void;
}

export default Command;