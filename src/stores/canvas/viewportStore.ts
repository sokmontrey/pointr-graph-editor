import {create} from 'zustand';
import {Vec2} from "../../utils/vector.ts";

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
    minScale: 1,
    maxScale: 3,
};

export interface ViewportStore extends ViewportState, ViewportAction {
}

export const useViewportStore = create<ViewportStore>((set, get) => ({
    ...defaultViewportSettings,
    pan: (changeInOffset) => set({
        offset: get().offset.add(changeInOffset)
    }),
    zoom: (factor, mousePos) => {
        const {scale, minScale, maxScale, offset} = get();
        const newScale = Math.max(minScale, Math.min(maxScale, scale * factor));
        if (newScale !== scale) {
            const scaleChange = newScale / scale;
            const newOffset = mousePos.subtract(mousePos.subtract(offset).multiply(scaleChange));
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
