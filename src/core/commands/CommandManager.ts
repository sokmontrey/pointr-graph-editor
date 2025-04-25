import { ICommand } from "./ICommand.ts";

export class CommandManager {
    private commandStack: ICommand[] = [];
    private redoStack: ICommand[] = [];

    execute(command: ICommand): void {
        command.execute();
        this.commandStack.push(command);
        this.redoStack = [];
    }

    undo(): void {
        if (this.commandStack.length > 0) {
            const command = this.commandStack.pop()!;
            command.undo();
            this.redoStack.unshift(command); // Push to the beginning for redo
        }
    }

    redo(): void {
        if (this.redoStack.length > 0) {
            const command = this.redoStack.shift()!;  // Remove from the beginning
            command.execute();
            this.commandStack.push(command);
        }
    }
}
