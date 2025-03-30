export interface Point {
    x: number;
    y: number;
}

export type EventType = 'mousemove' | 'dragging' | 'click' | 'wheel';
export type EventCallback<T extends Event> = (event: T) => void;
export type EventUnsubscriber = () => void;

export interface EventBus {
    subscribe<T extends Event>(eventType: EventType, callback: EventCallback<T>): EventUnsubscriber;
    publish<T extends Event>(eventType: EventType, event: T): void;
}

export interface Mode {
    name: string;
    handleDragging(e: MouseEvent): void;
    handleClick(e: MouseEvent): void;
    handleMouseMove(e: MouseEvent): void;
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

export interface ViewportSettings {
    initialX?: number;
    initialY?: number;
    initialScale?: number;
    minScale?: number;
    maxScale?: number;
}

export type RenderFunction = (ctx: CanvasRenderingContext2D) => void;