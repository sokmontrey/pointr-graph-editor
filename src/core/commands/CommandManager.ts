import {EdgeStore, NodeSeedStore, NodeStore} from "../../stores/graph";
import Command from "./Command.ts";

class CommandManager {
    private undoStack: Command[] = [];
    private redoStack: Command[] = [];
    private readonly nodeStore: NodeStore;
    private readonly edgeStore: EdgeStore;
    private readonly nodeSeedStore: NodeSeedStore;

    constructor(nodeStore: NodeStore, edgeStore: EdgeStore, nodeSeedStore: NodeSeedStore) {
        this.nodeStore = nodeStore;
        this.edgeStore = edgeStore;
        this.nodeSeedStore = nodeSeedStore;
    }

    execute(command: Command) {
        command.setNodeStore(this.nodeStore);
        command.setEdgeStore(this.edgeStore);
        command.setNodeSeedStore(this.nodeSeedStore);
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