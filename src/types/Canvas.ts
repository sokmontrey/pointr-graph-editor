export interface InteractionListener {
  event: string;
  handler: (e: any) => void;
}

export interface Viewport {
  x: number;
  y: number;
  scale: number;
}