import { useRef, useCallback } from 'react';
import { EventType, EventCallback } from '../../types';

export const useEventBus = () => {
    const listenersRef = useRef<Map<EventType, Set<EventCallback<any>>>>(new Map());

    const subscribe = useCallback(<T extends Event>(
        eventType: EventType,
        callback: EventCallback<T>
    ): (() => void) => {
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

    const publish = useCallback(<T extends Event>(
        eventType: EventType,
        event: T
    ): void => {
        const listeners = listenersRef.current.get(eventType);
        if (listeners) {
            listeners.forEach(callback => callback(event));
        }
    }, []);

    return { subscribe, publish };
};
