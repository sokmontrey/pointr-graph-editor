import { RefObject, useEffect } from 'react';
import { useInteraction } from '../../contexts/InteractionContext';

export const useCanvasInteraction = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  dragThreshold = 5,
) => {
  const { triggerEvent } = useInteraction();

  let startX: number | null = null;
  let startY: number | null = null;
  let isMouseDown = false;
  let isDragging = false;

  const handleMouseDown = (e: MouseEvent) => {
    isMouseDown = true;
    isDragging = false;
    startX = e.clientX;
    startY = e.clientY;
  };

  const handleMouseUp = (e: MouseEvent) => {
    isMouseDown = false;
    if (isDragging) {
      triggerEvent('dragend', e);
      isDragging = false;
    } else {
      triggerEvent('click', e);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      triggerEvent('dragging', e);
    } else {
      triggerEvent('mousemove', e);
    }

    if (!isMouseDown) return;
    if (startX === null || startY === null) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) < dragThreshold && Math.abs(dy) < dragThreshold) return;
    isDragging = true;
  };

  const handleWheel = (e: WheelEvent) => {
    triggerEvent('wheel', e);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [canvasRef, dragThreshold, triggerEvent]);
};
