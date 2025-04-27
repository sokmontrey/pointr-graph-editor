import {create} from 'zustand';
import {Mode, SelectMode} from '../../domain/modes'
import {useEdgeStore, useNodeSeedStore, useNodeStore} from "../graph";
import {useGridStore} from "../canvas";
import {useSelectionStore} from "./selectionStore.ts";
import {useCommandStore} from "./commandStore.ts";
import CommandFactory from "../../core/commands/CommandFactory.ts";

export interface ModeState {
    mode: Mode;
}

export interface ModeAction {
    setMode: (mode: Mode) => void;
}

export type ModeStore = ModeState & ModeAction;

export const useModeStore = create<ModeStore>((set) => ({
    mode: new SelectMode(
        useNodeStore.getState(),
        useEdgeStore.getState(),
        useGridStore.getState(),
        useSelectionStore.getState(),
        useCommandStore.getState(),
        new CommandFactory(
            useNodeSeedStore.getState(),
            useNodeStore.getState(),
            useEdgeStore.getState(),
        ),
    ), // TODO: refactor this. i really dont know how.
    setMode: (mode) => set({mode}),
}));
