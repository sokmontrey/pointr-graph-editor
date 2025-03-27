export interface InteractionListener {
  event: string;
  handler: (e: any) => void;
}
