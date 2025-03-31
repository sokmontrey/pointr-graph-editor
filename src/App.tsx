import { useCallback, useRef } from 'react';
import './App.css';
import { useCanvasInteraction } from './hooks/canvas/useCanvasInteraction';
import { useModeManager } from './hooks/mode/useModeManager';
import { useAttachModeEvent, useAttachViewportEvent } from './hooks/event/eventAttachments';
import useSelectMode from './hooks/mode/useSelectMode';
import { useViewportManager } from './hooks/canvas/useViewport';
import { useEventBus } from './hooks/event/useEventBus';
import Controls from './components/Controls';
import Canvas from './components/Canvas';
import { useCanvasRenderer } from './hooks/canvas/useCanvasRenderer';

const viewportSettings = { // TODO: add this to a configuration file
    initialX: 0,
    initialY: 0,
    initialScale: 1,
    minScale: 0.1,
    maxScale: 10,
};

export default function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const modeManager = useModeManager(useSelectMode());
    const viewportManager = useViewportManager(viewportSettings);

    // Memoize the eventBus to prevent recreation on re-renders
    const eventBus = useRef(useEventBus()).current;
    
    useAttachViewportEvent(eventBus, viewportManager);
    useAttachModeEvent(eventBus, modeManager.mode);

    useCanvasInteraction(canvasRef, eventBus);

    const render = useCallback((ctx: CanvasRenderingContext2D) => {
      ctx.beginPath();
      ctx.arc(100, 100, 50, 0, 2 * Math.PI);
      ctx.strokeStyle = 'white';
      ctx.stroke();
    }, []);

    useCanvasRenderer(canvasRef, viewportManager, render);

    return (
        <div>
            <p>Current mode: {modeManager.mode.name}</p>
            <Controls setMode={modeManager.setMode} />
            <Canvas ref={canvasRef} /> 
        </div>
    );
}








