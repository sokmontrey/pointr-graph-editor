import { Point } from "../utils/point";

export type CanvasInteractionType = void; 

export interface CanvasRendererType {
    draw: () => void;
}

export type RenderFunction = (ctx: CanvasRenderingContext2D) => void;

export interface RenderBus {
    subscribe(renderFn: RenderFunction): () => void;
    publish(ctx: CanvasRenderingContext2D): void;
}

export interface ViewportSettings {
    initialX?: number;
    initialY?: number;
    initialScale?: number;
    minScale?: number;
    maxScale?: number;
}

export interface ViewportTransform {
    x: number;
    y: number;
    scale: number;
}

export interface ViewportManager {
    viewport: ViewportTransform;
    setViewport: React.Dispatch<React.SetStateAction<ViewportTransform>>;
    handlePan: (e: MouseEvent) => void;
    handleZoom: (e: WheelEvent) => void;
}

export type AttachViewportEventType = void;
export type AttachModeEventType = void;

export type EventType = 'mousemove' | 'dragging' | 'click' | 'wheel';
export type EventCallback<T extends Event> = (event: T) => void;
export type EventUnsubscriber = () => void;

export interface EventBus {
    subscribe<T extends Event>(eventType: EventType, callback: EventCallback<T>): EventUnsubscriber;
    publish<T extends Event>(eventType: EventType, event: T): void;
}

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

export interface ModeManager {
    mode: Mode;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export interface Mode {
    name: string;
    handleDragging(e: MouseEvent): void;
    handleClick(e: MouseEvent): void;
    handleMouseMove(e: MouseEvent): void;
}