import { useRef } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import { useCanvasInteraction } from './hooks/useCanvasInteraction';
import { useViewport } from './hooks/useViewport';
import { useModeManager } from './hooks/useModeManager';
import { useEventManager } from './hooks/useEventManager';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mode } = useModeManager();
  const { viewport, handlePan, handleZoom } = useViewport(1);

  useEventManager({
    mode,
    handlePan,
    handleZoom,
  });

  useCanvasInteraction(canvasRef);

  return (
    <div>
      <p>Current mode: {mode.name}</p>
      <Canvas viewport={viewport} ref={canvasRef} />
    </div>
  );
}








