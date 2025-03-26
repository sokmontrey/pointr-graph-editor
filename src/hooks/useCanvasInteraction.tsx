import { RefObject, useEffect } from 'react';
import { Mode } from '../types/Mode';

export const useCanvasInteraction = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  mode: Mode,
  dragThreshold = 5,
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      startX = e.clientX;
      startY = e.clientY;
      isDragging = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        const deltaX = Math.abs(e.clientX - startX);
        const deltaY = Math.abs(e.clientY - startY);
        if (deltaX > dragThreshold || deltaY > dragThreshold) {
          isDragging = true;
          mode.handleDragStart(e);
        }
      }
      if (isDragging) {
        mode.handleDrag(e);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging) {
        mode.handleClick(e);
      } else {
        mode.handleDragEnd(e);
      }
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      mode.handleWheel(e);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [canvasRef, mode, dragThreshold]);
};
