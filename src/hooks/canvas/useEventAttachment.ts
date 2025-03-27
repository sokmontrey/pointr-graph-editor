import { useEffect } from 'react';
import { Mode } from '../../types/Mode';
import { useInteraction } from '../../contexts/InteractionContext';

export const useEventAttachment = (
  mode: Mode,
  pan: (movementX: number, movementY: number) => void,
  zoom: (clientX: number, clientY: number, deltaY: number) => void,
) => {
  attachMode(mode);
  attachViewport(pan, zoom);
};

const attachMode = (mode: Mode) => {
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
};

const attachViewport = (
  pan: (movementX: number, movementY: number) => void,
  zoom: (clientX: number, clientY: number, deltaY: number) => void,
) => {
  const { on, off } = useInteraction();

  useEffect(() => {
    const handleZoom = (e: WheelEvent) => {
      zoom(e.clientX, e.clientY, e.deltaY);
    };

    const handlePan = (e: MouseEvent) => {
      // TODO: create enum for buttons
      if (e.buttons !== 4) return; // TODO: space or ctrl can also pan
      pan(e.movementX, e.movementY);
    };

    on('wheel', handleZoom);
    on('dragging', handlePan);

    return () => {
      off('wheel', handleZoom);
      off('dragging', handlePan);
    };
  }, [on, off]);
};

