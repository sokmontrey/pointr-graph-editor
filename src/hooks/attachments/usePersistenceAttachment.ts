import { useEffect, useRef } from 'react';
import { persistenceService } from '../../services/persistenceService.ts';

export const usePersistenceAttachment = <T>(
    storeSubscribe: (callback: (state: T) => void) => () => void,
    shouldPersist: (state: T) => boolean,
    debounceMs: number = 1000
) => {
    const debounceTimerRef = useRef<number | null>(null);

    useEffect(() => {
        const unsubscribe = storeSubscribe((state: T) => {
            if (shouldPersist(state)) {
                if (debounceTimerRef.current !== null) {
                    window.clearTimeout(debounceTimerRef.current);
                }

                debounceTimerRef.current = window.setTimeout(() => {
                    persistenceService.saveAllStores();
                    debounceTimerRef.current = null;
                }, debounceMs);
            }
        });

        return () => {
            unsubscribe();
            if (debounceTimerRef.current !== null) {
                window.clearTimeout(debounceTimerRef.current);
            }
        };
    }, [storeSubscribe, shouldPersist, debounceMs]);
};