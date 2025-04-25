import {GraphStore} from "../../stores/graph";

export interface ICommand {
    execute(): void;
    undo(): void;
    setGraphStore(graphStore: GraphStore): void;
}