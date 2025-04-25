import {useRef, useCallback} from 'react';
import {Vec2} from "../../utils/vector.ts";

export type EventType = 'mousemove' | 'dragging' | 'click' | 'wheel';

export type EventPropMap = {
    mousemove: { mousePos: Vec2, movement: Vec2 };
    dragging: { mousePos: Vec2, movement: Vec2, buttons: number };
    click: { mousePos: Vec2, buttons: number };
    wheel: { mousePos: Vec2, deltaY: number };
};

export enum MouseButton {
    Middle = 4,
}

export interface EventBus {
    subscribe<K extends keyof EventPropMap>(
        eventType: K,
        callback: (props: EventPropMap[K]) => void,
    ): () => void;

    publish<K extends keyof EventPropMap>(
        eventType: K,
        props: EventPropMap[K],
    ): void;

    unsubscribe<K extends keyof EventPropMap>(
        eventType: K,
        callback: (props: EventPropMap[K]) => void,
    ): void;
}

export const useEventBus = (): EventBus => {
    const listenersRef = useRef<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Map<EventType, Set<(props: any) => void>>
    >(new Map());

    const unsubscribe = useCallback(<K extends keyof EventPropMap>(
        eventType: EventType,
        callback: (props: EventPropMap[K]) => void,
    ) => {
        const listeners = listenersRef.current.get(eventType);
        if (listeners) {
            listeners.delete(callback);
            if (listeners.size === 0) {
                listenersRef.current.delete(eventType);
            }
        }
    }, []);

    const subscribe = useCallback(<K extends keyof EventPropMap>(
        eventType: K,
        callback: (props: EventPropMap[K]) => void,
    ) => {
        if (!listenersRef.current.has(eventType)) {
            listenersRef.current.set(eventType, new Set());
        }

        listenersRef.current.get(eventType)!.add(callback);

        return () => unsubscribe(eventType, callback);
    }, [unsubscribe]);

    const publish = useCallback((
        eventType: EventType,
        props: EventPropMap[EventType]
    ) => {
        const listeners = listenersRef.current.get(eventType);
        if (listeners) {
            listeners.forEach(callback => callback(props));
        }
    }, []);

    return {
        publish,
        subscribe,
        unsubscribe,
    };
};
