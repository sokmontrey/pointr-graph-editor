import { useEffect, useRef } from 'react';
import { persistenceService } from '../../services/persistenceService';
import { useCommandStore } from '../../stores/main';

/**
 * Hook to automatically save store data when commands are executed
 * @param debounceMs Debounce time in milliseconds
 */
export const usePersistence = (debounceMs: number = 1000) => {
  const commandStore = useCommandStore();
  const debounceTimerRef = useRef<number | null>(null);
  
  // Load data on initial mount
  useEffect(() => {
    // Try to load data from the current workspace
    persistenceService.loadAllStores();
  }, []);

  // Save data when commands are executed
  useEffect(() => {
    // Subscribe to changes in the command store
    const unsubscribe = useCommandStore.subscribe((state) => {
      // If the undoStack changes, a command was executed
      if (state.undoStack.length > 0) {
        // Debounce the save operation
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
      // Clean up the subscription and any pending debounce timer
      unsubscribe();
      if (debounceTimerRef.current !== null) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, [debounceMs]);

  return {
    saveAllStores: persistenceService.saveAllStores.bind(persistenceService),
    loadAllStores: persistenceService.loadAllStores.bind(persistenceService),
    getCurrentWorkspace: persistenceService.getCurrentWorkspace.bind(persistenceService),
    setCurrentWorkspace: persistenceService.setCurrentWorkspace.bind(persistenceService),
    clearCurrentWorkspace: persistenceService.clearCurrentWorkspace.bind(persistenceService),
  };
};

// Export the persistence service for direct access
export { persistenceService };
