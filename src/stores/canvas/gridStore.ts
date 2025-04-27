import {create} from 'zustand';

export interface GridState {
    gap: number;
}

export interface GridAction {
    setGap: (gap: number) => void;
}

export const defaultGridSettings: GridState = {
    gap: 10,
};

export type GridStore = GridState & GridAction;

export const useGridStore = create<GridStore>((set) => ({
    ...defaultGridSettings,
    setGap: (gap) => set({gap}),
}));
