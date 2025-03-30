export interface Point {
  x: number;
  y: number;
}

export type EventType = 'mousemove' | 'dragging' | 'click' | 'wheel' ;
export type EventCallback<T extends Event> = (event: T) => void;
export type EventUnsubscriber = () => void;

export interface EventBus {
  subscribe<T extends Event>(eventType: EventType, callback: EventCallback<T>): EventUnsubscriber;
  publish<T extends Event>(eventType: EventType, event: T): void;
} 