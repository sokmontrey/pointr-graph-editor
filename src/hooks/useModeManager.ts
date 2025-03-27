import { useState, useEffect } from 'react';
import { Mode } from '../types/Mode';
import SelectMode from '../cores/modes/SelectMode';
import { useInteraction } from '../contexts/InteractionContext';

export function useModeManager(initialMode: Mode = new SelectMode()) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const { on, off } = useInteraction();

  useEffect(() => {
    const handlers = {
      click: mode.handleClick.bind(mode),
      dragging: mode.handleDragging.bind(mode),
      dragend: mode.handleDragEnd.bind(mode),
      mousemove: mode.handleMouseMove.bind(mode)
    };
    
    Object.entries(handlers).forEach(([event, handler]) => {
      on(event, handler);
    });
    
    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        off(event, handler);
      });
    };
  }, [mode, on, off]);

  return {
    mode,
    setMode,
  };
}
