import {GraphStore} from "../../stores/graph";
import Command from "./Command.ts";

class CommandManager {
    private undoStack: Command[] = [];
    private redoStack: Command[] = [];
    private readonly graphStore: GraphStore;

    constructor(store: GraphStore) {
        this.graphStore = store;
    }

    execute(command: Command) {
        command.setGraphStore(this.graphStore);
        command.execute();
        this.undoStack.push(command);
        this.redoStack = [];
    }

    undo() {
        if (this.undoStack.length > 0) {
            const command = this.undoStack.pop()!;
            command.undo();
            this.redoStack.push(command);
        }
    }

    redo() {
        if (this.redoStack.length > 0) {
            const command = this.redoStack.pop()!;
            command.execute();
            this.undoStack.push(command);
        }
    }
}

export default CommandManager;