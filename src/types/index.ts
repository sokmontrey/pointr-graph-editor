import { Vec2 } from "../utils/vector";

// ================================= Canvas =================================

export type CanvasInteraction = void; 

export interface CanvasRenderer {
    draw: () => void;
}

export type RenderFunction = (ctx: CanvasRenderingContext2D) => void;

export interface RenderBus {
    subscribe(renderFn: RenderFunction): () => void;
    publish(ctx: CanvasRenderingContext2D): void;
}

// ================================= Viewport =================================

export interface ViewportTransform {
    x: number;
    y: number;
    scale: number;
}

export interface ViewportManager {
    viewport: ViewportTransform;
    handlePan: (e: MouseEvent) => void;
    handleZoom: (e: WheelEvent) => void;
}

// ================================= Event =================================

export type AttachViewportEvent = void;
export type AttachModeEvent = void;

export type EventType = 'mousemove' | 'dragging' | 'click' | 'wheel';
export type EventCallback<T extends Event> = (event: T) => void;
export type EventUnsubscriber = () => void;

export interface EventBus {
    subscribe<T extends Event>(eventType: EventType, callback: EventCallback<T>): EventUnsubscriber;
    publish<T extends Event>(eventType: EventType, event: T): void;
}

// ================================= Image Overlay =================================

export interface ImageOverlayManager {
    draw: RenderFunction;
    setImage(image: HTMLImageElement | null): void;
    setImageOffset(offset: Vec2): void;
    setImageScale(scale: number): void;
    setImageOpacity(opacity: number): void;
    imageOffset: Vec2;
    imageScale: number;
    imageOpacity: number;
}

// ================================= Mode =================================

export interface ModeManager {
    mode: Mode;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
}
