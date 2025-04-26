import Canvas, {ZIndexProps} from "./Canvas.tsx";
import {useRef} from "react";
import {useImageOverlayStore} from "../../stores/canvas";
import {useRenderingBus} from "../../hooks/rendering";
import {useRenderingHandler} from "../../hooks/rendering";
import {useViewportStore} from "../../stores/canvas";

const ImageOverlayCanvas = ({zIndex}: ZIndexProps) => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    const viewport = useViewportStore();
    const imageOverlay = useImageOverlayStore();

    const renderingBus = useRenderingBus();
    renderingBus.subscribe(imageOverlay.draw);

    useRenderingHandler(ref, renderingBus, viewport);

    return <Canvas
        zIndex={zIndex}
        ref={ref}
        disablePointerEvent={true}
    />;
}

export default ImageOverlayCanvas;