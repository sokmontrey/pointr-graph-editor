import {create} from 'zustand';

export interface GridState {
    gap: number;
}

export interface GridAction {
    setGap: (gap: number) => void;
}

const defaultGridSettings: GridState = {
    gap: 10,
};

export const useGridStore = create<
    GridState & GridAction
>((set) => ({
    ...defaultGridSettings,
    setGap: (gap) => set({gap}),
}));
