export interface InteractionListener {
  event: string;
  handler: (e: any) => void;
}

export interface Viewport {
  x: number;
  y: number;
  scale: number;
}

export type RenderFunction = (ctx: CanvasRenderingContext2D) => void;
