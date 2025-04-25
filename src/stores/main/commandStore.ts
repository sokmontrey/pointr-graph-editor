import {create} from 'zustand';
import {ICommand} from "../../core/commands/Command.ts";

export interface CommandState {
    commandStack: ICommand[];
    redoStack: ICommand[];
}

export interface CommandAction {
    execute: (command: ICommand) => void;
    undo: () => void;
    redo: () => void;
}

export type CommandStore = CommandState & CommandAction;

export const useCommandStore = create<CommandStore>((set, get) => ({
    commandStack: [],
    redoStack: [],
    execute: (command) => {
        command.execute();
        set({commandStack: [...get().commandStack, command], redoStack: []});
    },
    undo: () => {
        const {commandStack, redoStack} = get();
        if (commandStack.length > 0) {
            const command = commandStack.pop()!;
            command.undo();
            set({commandStack, redoStack: [command, ...redoStack]});
        }
    },
    redo: () => {
        const {commandStack, redoStack} = get();
        if (redoStack.length > 0) {
            const command = redoStack.pop()!;
            command.execute();
            set({commandStack: [...commandStack, command], redoStack});
        }
    },
}));