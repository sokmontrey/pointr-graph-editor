import { useCallback, useRef } from 'react';
import './App.css';
import { useCanvasInteraction } from './hooks/canvas/useCanvasInteraction';
import { useModeManager } from './hooks/mode/useModeManager';
import { useAttachModeEvent, useAttachViewportEvent } from './hooks/canvas/eventAttachments';
import useSelectMode from './hooks/mode/useSelectMode';
import { useViewport } from './hooks/canvas/useViewport';
import { useEventBus } from './hooks/canvas/useEventBus';

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
    const viewport = useViewport(...Object.values(viewportSettings));

    const eventBus = useEventBus();
    useAttachViewportEvent(eventBus, viewport);
    useAttachModeEvent(eventBus, modeManager.mode);

    useCanvasInteraction(canvasRef, eventBus);

    // const render = useCallback((ctx: CanvasRenderingContext2D) => {
    //   ctx.beginPath();
    //   ctx.arc(100, 100, 50, 0, 2 * Math.PI);
    //   ctx.strokeStyle = 'white';
    //   ctx.stroke();
    // }, []);

    // useCanvasRenderer(canvasRef, viewport, render);
    // useEventAttachment(mode, handlePan, handleZoom);
    // useCanvasInteraction(canvasRef);

    return (
        <div>
            {/* <p>Current mode: {mode.name}</p>
      <Controls setMode={setMode} />
      <Canvas ref={canvasRef} /> */}
        </div>
    );
}








