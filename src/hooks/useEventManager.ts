import { useEffect } from 'react';
import { Mode } from '../types/Mode';
import { useInteraction } from '../contexts/InteractionContext';

export function useEventManager ({
  mode,
  handlePan,
  handleZoom,
}: {
  mode: Mode;
  handlePan: (movementX: number, movementY: number) => void;
  handleZoom: (clientX: number, clientY: number, deltaY: number) => void;
}) {
  attachModeListeners(mode);
  attachViewportListeners(handlePan, handleZoom);
}

export function attachModeListeners(mode: Mode) {
  const { on, off } = useInteraction();

  useEffect(() => {
    const modeHandlers = {
      click: mode.handleClick.bind(mode),
      dragging: mode.handleDragging.bind(mode),
      dragend: mode.handleDragEnd.bind(mode),
      mousemove: mode.handleMouseMove.bind(mode)
    };
    
    Object.entries(modeHandlers).forEach(([event, handler]) => {
      on(event, handler);
    });
    
    return () => {
      Object.entries(modeHandlers).forEach(([event, handler]) => {
        off(event, handler);
      });
    };
  }, [mode, on, off]);
}

export function attachViewportListeners(
  handlePan: (movementX: number, movementY: number) => void,
  handleZoom: (clientX: number, clientY: number, deltaY: number) => void,
) {
  const { on, off } = useInteraction();

  useEffect(() => {
    const handleViewportDrag = (e: MouseEvent) => {
      handlePan(e.movementX, e.movementY);
    };

    const handleViewportZoom = (e: WheelEvent) => {
      handleZoom(e.clientX, e.clientY, e.deltaY);
    };
    
    on('dragging', handleViewportDrag);
    on('wheel', handleViewportZoom);
    
    return () => {
      off('dragging', handleViewportDrag);
      off('wheel', handleViewportZoom);
    };
  }, [on, off, handlePan, handleZoom]);
}
