import {create} from 'zustand';
import {Vec2} from '../../utils/vector.ts';

export interface ImageOverlayState {
    image: HTMLImageElement | null;
    imageOffset: Vec2;
    imageScale: number;
    imageOpacity: number;
}

export interface ImageOverlayAction {
    setImage: (image: HTMLImageElement | null) => void;
    setImageOffset: (offset: Vec2) => void;
    setImageScale: (scale: number) => void;
    setImageOpacity: (opacity: number) => void;
    draw: (ctx: CanvasRenderingContext2D | null) => void;
}

const defaultImageOverlaySettings: ImageOverlayState = {
    image: null,
    imageOffset: new Vec2(0, 0),
    imageScale: 1,
    imageOpacity: 1,
};

export type ImageOverlayStore = ImageOverlayState & ImageOverlayAction;

export const useImageOverlayStore = create<ImageOverlayStore>((set, get) => ({
    ...defaultImageOverlaySettings,
    setImage: (image) => set({image}),
    setImageOffset: (imageOffset) => set({imageOffset}),
    setImageScale: (imageScale) => set({imageScale}),
    setImageOpacity: (imageOpacity) => set({imageOpacity}),
    draw: (ctx) => { // TODO move draw to somewhere else to separate concerns
        const {image, imageOffset, imageScale, imageOpacity} = get();
        if (!ctx || !image) return;
        ctx.globalAlpha = imageOpacity;
        ctx.drawImage(
            image,
            imageOffset.x,
            imageOffset.y,
            image.width * imageScale,
            image.height * imageScale,
        );
    },
}));
