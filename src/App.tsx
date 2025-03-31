import { useRef } from 'react';
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
import { useImageOverlayManager } from './hooks/imageOverlay/useImageOverlayManager';

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

    // ===== Rendering Bus =====
    const overlayRenderBus = useRef(useRenderBus()).current;
    const mainRenderBus = useRef(useRenderBus()).current;

    // ===== Rendering Attachment =====
    const imageOverlayManager = useImageOverlayManager(); // TODO: do I need ref?
    // TODO check if all .bind are necessary
    overlayRenderBus.subscribe(imageOverlayManager.draw.bind(imageOverlayManager));

    // ===== Rendering =====
    useCanvasRenderer(overlayCanvasRef, viewportManager, overlayRenderBus);
    useCanvasRenderer(mainCanvasRef, viewportManager, mainRenderBus);

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
