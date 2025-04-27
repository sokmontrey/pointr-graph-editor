import {useEffect, useRef} from 'react';
import {persistenceService} from '../../services/persistenceService.ts';
import {useImageOverlayStore} from "../../stores/canvas";

export const usePersistenceImageOverlayAttachment = (debounceMs: number = 1000) => {
    const debounceTimerRef = useRef<number | null>(null);

    useEffect(() => {
        const unsubscribe = useImageOverlayStore.subscribe((state) => {
            if (state.imageData !== null) {
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
    }, [debounceMs]);
};
