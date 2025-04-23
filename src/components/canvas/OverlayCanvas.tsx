import Canvas from "./Canvas.tsx";
import {useRef} from "react";
import {useImageOverlayStore} from "../../stores/imageOverlayStore.ts";
import {useRenderingBus} from "../../hooks/useRenderingBus.ts";
import {useCanvasRenderingHandler} from "../../hooks/useCanvasRenderingHandler.ts";
import {useViewportStore} from "../../stores/viewportStore.ts";

const OverlayCanvas = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    const viewport = useViewportStore();
    const imageOverlay = useImageOverlayStore();
    // const gridDots = useGridDotsStore();

    const renderingBus = useRenderingBus();
    renderingBus.subscribe(imageOverlay.draw);
    // renderingBus.subscribe(gridDots.draw);

    useCanvasRenderingHandler(ref, renderingBus, viewport);

    return (
        <Canvas
            ref={ref}
        />
    );
}

export default OverlayCanvas;