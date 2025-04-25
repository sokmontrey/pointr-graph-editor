import Canvas, {ZIndexProps} from "./Canvas.tsx";
import {useRef} from "react";
import {useImageOverlayStore} from "../../stores/imageOverlayStore.ts";
import {useRenderingBus} from "../../hooks/useRenderingBus.ts";
import {useRenderingHandler} from "../../hooks/useRenderingHandler.ts";
import {useViewportStore} from "../../stores/viewportStore.ts";

const OverlayCanvas = ({zIndex}: ZIndexProps) => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    const viewport = useViewportStore();
    const imageOverlay = useImageOverlayStore();
    // const gridDots = useGridDotsStore();

    const renderingBus = useRenderingBus();
    renderingBus.subscribe(imageOverlay.draw);
    // renderingBus.subscribe(gridDots.draw);

    useRenderingHandler(ref, renderingBus, viewport);

    return <Canvas
        zIndex={zIndex}
        ref={ref}
        disablePointerEvent={true}
    />;
}

export default OverlayCanvas;