import { create } from 'zustand';
import { Mode, SelectMode } from '../../domain/modes'
import {useEdgeStore, useNodeStore} from "../graph";

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
    ),
    setMode: (mode) => set({ mode }),
}));
