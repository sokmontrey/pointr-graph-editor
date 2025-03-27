import { useRef } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import { useCanvasInteraction } from './hooks/canvas/useCanvasInteraction';
import { useViewport } from './hooks/canvas/useViewport';
import { useModeManager } from './hooks/mode/useModeManager';
import { useEventManager } from './hooks/canvas/useEventManager';
import Controls from './components/Controls';
import useSelectMode from './hooks/mode/useSelectMode';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mode, setMode } = useModeManager(useSelectMode());
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
      <Controls setMode={setMode} />
      <Canvas viewport={viewport} ref={canvasRef} />
    </div>
  );
}








