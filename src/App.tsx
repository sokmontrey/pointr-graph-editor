import { useCallback, useRef, useEffect } from 'react';
import './App.css';
import { useCanvasInteraction } from './hooks/canvas/useCanvasInteraction';
import { useModeManager } from './hooks/mode/useModeManager';
import { useAttachModeEvent, useAttachViewportEvent } from './hooks/event/eventAttachments';
import useSelectMode from './hooks/mode/useSelectMode';
import { useViewportManager } from './hooks/canvas/useViewport';
import { useEventBus } from './hooks/event/useEventBus';
import { useRenderBus } from './hooks/canvas/useRenderBus';
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
    const mainCanvasRef = useRef<HTMLCanvasElement>(null);
    const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

    const modeManager = useModeManager(useSelectMode());
    const viewportManager = useViewportManager(viewportSettings);

    const eventBus = useRef(useEventBus()).current;
    useAttachViewportEvent(eventBus, viewportManager);
    useAttachModeEvent(eventBus, modeManager.mode);
    useCanvasInteraction(mainCanvasRef, eventBus);

    const renderBus = useRef(useRenderBus()).current;
    // renderer attachment
    useCanvasRenderer(mainCanvasRef, viewportManager, renderBus);

    return (
        <div>
            <p>Current mode: {modeManager.mode.name}</p>
            <Controls setMode={modeManager.setMode} />
            <Canvas 
            mainRef={mainCanvasRef} 
            overlayRef={overlayCanvasRef}
            /> 
        </div>
    );
}








