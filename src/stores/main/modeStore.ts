import {create} from 'zustand';
import Mode from "../../domain/modes/Mode.ts";

export interface ModeState {
    mode: Mode;
}

export interface ModeAction {
    setMode: (mode: Mode) => void;
}

export type ModeStore = ModeState & ModeAction;

export const useModeStore = create<ModeStore>((set) => ({
    mode: new (class DefaultMode extends Mode {
        name = "Select";
    })(),
    setMode: (mode) => set({mode}),
}));