import {create} from 'zustand';
import {Vec2} from "../utils/vector.ts";

export interface ViewportState {
    offset: Vec2;
    minScale: number;
    maxScale: number;
    scale: number;
}

export interface ViewportAction {
    pan: (changeInOffset: Vec2) => void;
    zoom: (factor: number, mousePos: Vec2) => void;
    reset: () => void;
}

const defaultViewportSettings: ViewportState = {
    offset: new Vec2(0, 0),
    scale: 1,
    minScale: 0.1,
    maxScale: 10,
};

export const useViewportStore = create<
    ViewportState & ViewportAction
>((set, get) => ({
    ...defaultViewportSettings,
    pan: (changeInOffset) => set({
        offset: get().offset.add(changeInOffset)
    }),
    zoom: (factor, mousePos) => {
        const newScale = Math.max(
            get().minScale,
            Math.min(get().maxScale, get().scale * factor)
        );
        if (newScale !== get().scale) {
            const offsetDiff = mousePos.subtract(get().offset);
            const newOffset = mousePos.subtract(
                offsetDiff.multiply(newScale / get().scale)
            );
            set({
                scale: newScale,
                offset: newOffset,
            });
        }
    },
    reset: () => set({
        offset: new Vec2(0, 0),
        scale: 1,
    }),
}));
