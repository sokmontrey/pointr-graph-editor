import Canvas from "./Canvas.tsx";
import {useRef} from "react";
import {useImageOverlayStore} from "../../stores/imageOverlayStore.ts";
import {useRenderingBus} from "../../hooks/useRenderingBus.ts";
import {useRenderingHandler} from "../../hooks/useRenderingHandler.ts";
import {useViewportStore} from "../../stores/viewportStore.ts";

const OverlayCanvas = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    const viewport = useViewportStore();
    const imageOverlay = useImageOverlayStore();
    // const gridDots = useGridDotsStore();

    const renderingBus = useRenderingBus();
    renderingBus.subscribe(imageOverlay.draw);
    // renderingBus.subscribe(gridDots.draw);

    useRenderingHandler(ref, renderingBus, viewport);

    const baseGridSize = 10; // TODO: grid store & control
    const gridSize = Math.max(1, baseGridSize * viewport.scale);

    return (<>
        <div
            className="absolute -z-10 inset-0 h-full w-full"
            style={{
                backgroundImage: 'radial-gradient(circle, #73737388 1px, transparent 1px)',
                backgroundSize: `${gridSize}px ${gridSize}px`,
                backgroundPosition: `${viewport.offset.x % gridSize}px ${viewport.offset.y % gridSize}px`,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
            }}
        />

        <Canvas ref={ref}/>
    </>);
}

export default OverlayCanvas;