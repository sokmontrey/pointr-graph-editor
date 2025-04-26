import { create } from 'zustand';
import { IMode, SelectMode } from '../../domain/modes'
import {useEdgeStore, useNodeStore} from "../graph";

export interface ModeState {
    mode: IMode;
}

export interface ModeAction {
    setMode: (mode: IMode) => void;
}

export type ModeStore = ModeState & ModeAction;

export const useModeStore = create<ModeStore>((set) => ({
    mode: new SelectMode(
        useNodeStore.getState(),
        useEdgeStore.getState(),
    ),
    setMode: (mode) => set({ mode }),
}));
