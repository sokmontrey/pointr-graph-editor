import {create} from 'zustand';
import {Vec2} from "../utils/vector.ts";

export interface ViewportState {
    offset: Vec2;
    minScale: number;
    maxScale: number;
    scale: number;
}

interface ViewportAction {
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

// const handlePan = useCallback((e: MouseEvent) => {
//     if (e.buttons !== 4) return;
//     const { movementX, movementY } = e;
//     setViewport(prev => ({
//         ...prev,
//         x: prev.x + movementX,
//         y: prev.y + movementY,
//     }));
// }, []);
//
// const handleZoom = useCallback((e: WheelEvent) => {
//     const { clientX, clientY, deltaY } = e;
//     const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
//     const x = clientX - rect.left;
//     const y = clientY - rect.top;
//
//     const factor = deltaY > 0 ? 0.9 : 1.1;
//     setViewport(prev => {
//         const newScale = Math.max(minScale, Math.min(maxScale, prev.scale * factor));
//         if (newScale !== prev.scale) {
//             return {
//                 scale: newScale,
//                 x: x - (x - prev.x) * (newScale / prev.scale),
//                 y: y - (y - prev.y) * (newScale / prev.scale),
//             };
//         }
//         return prev;
//     });
// }, [minScale, maxScale]);
