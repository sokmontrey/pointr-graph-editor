import {useEffect, useRef} from 'react';
import {persistenceService} from '../../services/persistenceService.ts';
import {CommandStore, useCommandStore} from '../../stores/main';

export const usePersistenceStoreAttachment = (debounceMs: number = 1000) => {
    const debounceTimerRef = useRef<number | null>(null);

    useEffect(() => {
        const unsubscribe = useCommandStore.subscribe((state: CommandStore) => {
            if (state.undoStack.length > 0 || state.redoStack.length > 0) {
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
