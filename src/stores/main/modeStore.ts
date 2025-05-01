import {create} from 'zustand';
import {Mode, SelectMode} from '../../domain/modes'

export interface ModeState {
    mode: Mode;
}

export interface ModeAction {
    setMode: (mode: Mode) => void;
}

export type ModeStore = ModeState & ModeAction;

export const useModeStore = create<ModeStore>((set) => ({
    mode: new SelectMode(),
    setMode: (mode) => set({mode}),
}));
