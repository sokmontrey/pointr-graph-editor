export type RenderFunction = (ctx: CanvasRenderingContext2D) => void;

export interface RenderBus {
    subscribe(renderFn: RenderFunction): () => void;
    publish(ctx: CanvasRenderingContext2D): void;
}
