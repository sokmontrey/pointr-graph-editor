import { Point } from "../utils/point";
import { RenderFunction } from "./rendering";

export interface ImageOverlayManager {
    draw: RenderFunction;
    setImage(image: HTMLImageElement | null): void;
    setImageOffset(offset: Point): void;
    setImageScale(scale: number): void;
    setImageOpacity(opacity: number): void;
    imageOffset: Point;
    imageScale: number;
    imageOpacity: number;
}