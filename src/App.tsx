import { useRef } from 'react';
import './App.css';
import { useCanvasInteraction } from './hooks/canvas/useCanvasInteraction';
import { useModeManager } from './hooks/mode/useModeManager';
import { useAttachModeEvent, useAttachViewportEvent } from './hooks/busAttachment/eventAttachments';
import useSelectMode from './hooks/mode/useSelectMode';
import { useViewportManager } from './hooks/canvas/useViewport';
import { useEventBus } from './hooks/buses/useEventBus';
import { useRenderBus } from './hooks/buses/useRenderBus';
import Controls from './components/Controls';
import Canvas from './components/Canvas';
import { useCanvasRenderer } from './hooks/canvas/useCanvasRenderer';
import { useImageOverlayManager } from './hooks/imageOverlay/useImageOverlayManager';
import { useAttachImageOverlayRenderer } from './hooks/busAttachment/rendererAttachments';

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
    const imageOverlayManager = useImageOverlayManager();

    const eventBus = useRef(useEventBus()).current;
    const overlayRenderBus = useRef(useRenderBus()).current;
    const mainRenderBus = useRef(useRenderBus()).current;

    useAttachViewportEvent(eventBus, viewportManager);
    useAttachModeEvent(eventBus, modeManager.mode);
    useAttachImageOverlayRenderer(overlayRenderBus, imageOverlayManager.draw);

    useCanvasRenderer(overlayCanvasRef, viewportManager, overlayRenderBus);
    useCanvasRenderer(mainCanvasRef, viewportManager, mainRenderBus);

    useCanvasInteraction(mainCanvasRef, eventBus);

    return (
        <div>
            <p>Current mode: {modeManager.mode.name}</p>
            <Controls
                modeManager={modeManager}
                imageOverlayManager={imageOverlayManager}
            />
            <Canvas
                mainRef={mainCanvasRef}
                overlayRef={overlayCanvasRef}
            />
        </div>
    );
}
