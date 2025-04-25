import { create } from 'zustand';
import { IMode, SelectMode } from '../../domain/modes'

export interface ModeState {
    mode: IMode;
}

export interface ModeAction {
    setMode: (mode: IMode) => void;
}

export const useModeStore = create<
    ModeState & ModeAction
>((set) => ({
    mode: new SelectMode(),
    setMode: (mode) => set({ mode }),
}));
