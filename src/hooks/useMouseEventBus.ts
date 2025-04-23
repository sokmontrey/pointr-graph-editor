import {useRef, useCallback} from 'react';

export type MouseEventType = 'mousemove' | 'dragging' | 'click' | 'wheel';

export type MouseEventCallback = (
    event: MouseEvent | WheelEvent
) => void;

interface EventBus {
    subscribe(
        eventType: MouseEventType,
        callback: MouseEventCallback,
    ): () => void;

    publish(
        eventType: MouseEventType,
        event: MouseEvent | WheelEvent,
    ): void;
}

export const useMouseEventBus = (): EventBus => {
    const listenersRef = useRef<
        Map<MouseEventType, Set<MouseEventCallback>>
    >(new Map());

    const subscribe = useCallback((
        eventType: MouseEventType,
        callback: MouseEventCallback
    ) => {
        if (!listenersRef.current.has(eventType)) {
            listenersRef.current.set(eventType, new Set());
        }

        listenersRef.current.get(eventType)!.add(callback);

        return () => {
            const listeners = listenersRef.current.get(eventType);
            if (listeners) {
                listeners.delete(callback);
                if (listeners.size === 0) {
                    listenersRef.current.delete(eventType);
                }
            }
        };
    }, []);

    const publish = useCallback((
        eventType: MouseEventType,
        event: MouseEvent | WheelEvent
    ) => {
        const listeners = listenersRef.current.get(eventType);
        if (listeners) {
            listeners.forEach((callback) => callback(event));
        }
    }, []);

    return {subscribe, publish};
};
