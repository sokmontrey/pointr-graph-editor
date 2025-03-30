export interface InteractionListener {
    event: string;
    handler: (e: any) => void;
}

export type RenderFunction = (ctx: CanvasRenderingContext2D) => void;
