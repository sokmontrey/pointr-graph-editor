import { useCallback, useRef } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import { useCanvasInteraction } from './hooks/canvas/useCanvasInteraction';
import { useModeManager } from './hooks/mode/useModeManager';
import { useEventAttachment } from './hooks/canvas/useEventAttachment';
import Controls from './components/Controls';
import useSelectMode from './hooks/mode/useSelectMode';
import { useViewport } from './hooks/canvas/useViewport';
import { useCanvasRenderer } from './hooks/canvas/useCanvasRenderer';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mode, setMode } = useModeManager(useSelectMode());
  const viewportSettings = { // TODO: add this to a configuration file
    initialX: 0,
    initialY: 0,
    initialScale: 1,
    minScale: 0.1,
    maxScale: 10,
  }
  const { viewport, handlePan, handleZoom } = useViewport(...Object.values(viewportSettings));

  const render = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, 2 * Math.PI);
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }, []);

  const { draw } = useCanvasRenderer(canvasRef, viewport, render);
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








