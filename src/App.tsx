import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import { useCanvasInteraction } from './hooks/canvas/useCanvasInteraction';
import { useModeManager } from './hooks/mode/useModeManager';
import { useEventAttachment } from './hooks/canvas/useEventAttachment';
import Controls from './components/Controls';
import useSelectMode from './hooks/mode/useSelectMode';
import { useViewport } from './hooks/canvas/useViewport';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mode, setMode } = useModeManager(useSelectMode());

  const draw = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, 2 * Math.PI);
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }, []);

  // Update canva and redraw
  const { handlePan, handleZoom } = useViewport(1);

  useEventAttachment(mode, handlePan, handleZoom);
  useCanvasInteraction(canvasRef);

  return (
    <div>
      <p>Current mode: {mode.name}</p>
      <Controls setMode={setMode} />
      <Canvas ref={canvasRef} />
    </div>
  );
}








