import { Point } from "../utils/point";

export interface ImageOverlayManager {
    draw(): void;
    setImage(image: HTMLImageElement | null): void;
    setImageOffset(offset: Point): void;
    setImageScale(scale: number): void;
}