import {create} from 'zustand';
import {ICommand} from "../../core/commands/ICommand.ts";

export interface CommandState {
    undoStack: ICommand[];
    redoStack: ICommand[];
}

export interface CommandAction {
    execute: (command: ICommand) => void;
    undo: () => void;
    redo: () => void;
    clear: () => void;
}

export type CommandStore = CommandState & CommandAction;

export const useCommandStore = create<CommandStore>((set, get) => ({
    undoStack: [],
    redoStack: [],
    execute: (command) => {
        command.execute();
        set((state) => ({
            undoStack: [...state.undoStack, command],
            redoStack: [],
        }));
    },
    undo: () => {
        const {undoStack} = get();
        if (undoStack.length === 0) {
            return;
        }
        const command = undoStack.pop();
        if (command) {
            command.undo();
            set((state) => ({
                undoStack: state.undoStack,
                redoStack: [command, ...state.redoStack],
            }));
        }
    },
    redo: () => {
        const {redoStack} = get();
        if (redoStack.length === 0) {
            return;
        }
        const command = redoStack.shift();
        if (command) {
            command.execute();
            set((state) => ({
                undoStack: [...state.undoStack, command],
                redoStack: state.redoStack,
            }));
        }
    },
    clear: () => {
        set({undoStack: [], redoStack: []});
    },
}));