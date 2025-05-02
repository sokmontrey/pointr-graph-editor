import { useEffect, useRef } from 'react';
import {CommandStore, useCommandStore} from "../../stores/main";
import {persistenceService} from "../../services/persistenceService.ts";
import {GridState, ImageOverlayState, useGridStore, useImageOverlayStore} from "../../stores/canvas";

export const usePersistenceDebouncing = <T>(
    storeSubscribe: (callback: (state: T) => void) => () => void,
    shouldPersist: (state: T) => boolean,
    onSave: () => void,
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
                    onSave();
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
    }, [storeSubscribe, shouldPersist, debounceMs, onSave]);
};

export const usePersistenceDebouncingAttachment = (debounceMs: number = 1000) => {
    // Command Related: node and edge related actions
    usePersistenceDebouncing(
        useCommandStore.subscribe,
        (state: CommandStore) => state.undoStack.length > 0 || state.redoStack.length > 0,
        () => {
            persistenceService.saveCommandStore();
        },
        debounceMs
    );
    // Image overlay
    usePersistenceDebouncing(
        useImageOverlayStore.subscribe,
        (state: ImageOverlayState) => state.imageData !== null,
        () => {
            persistenceService.saveImageOverlayStore();
        },
        debounceMs
    );
    // Grid
    usePersistenceDebouncing(
        useGridStore.subscribe,
        (state: GridState) => !!state.gap,
        () => {
            persistenceService.saveGridStore();
        },
        debounceMs
    );
};
