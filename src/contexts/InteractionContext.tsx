import { createContext, useContext, useRef, ReactNode } from 'react';
import InteractionHandler from '../hooks/useInteractionHandler';

type InteractionContextType = {
  on: (event: string, handler: (e: any) => void) => void;
  off: (event: string, handler: (e: any) => void) => void;
  triggerEvent: (event: string, data?: any) => void;
};

const InteractionContext = createContext<InteractionContextType | null>(null);

export function InteractionProvider({ children }: { children: ReactNode }) {
  const handlerRef = useRef(InteractionHandler());
  
  return (
    <InteractionContext.Provider value={{
      on: handlerRef.current.on,
      off: handlerRef.current.off,
      triggerEvent: handlerRef.current.triggerEvent
    }}>
      {children}
    </InteractionContext.Provider>
  );
}

export function useInteraction() {
  const context = useContext(InteractionContext);
  if (!context) {
    throw new Error('useInteraction must be used within an InteractionProvider');
  }
  return context;
}
