import Canvas, {ZIndexProps} from "./Canvas.tsx";
import {useRef} from "react";
import {useRenderingBus} from "../../hooks/useRenderingBus.ts";
import {useRenderingHandler} from "../../hooks/useRenderingHandler.ts";
import {useViewportStore} from "../../stores/viewportStore.ts";

const ModeOverlayCanvas = ({ zIndex }: ZIndexProps) => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    const viewport = useViewportStore();

    const renderingBus = useRenderingBus();

    useRenderingHandler(ref, renderingBus, viewport);

    return ( <Canvas
        zIndex={zIndex}
        ref={ref}
        disablePointerEvent={true}
    /> );
}

export default ModeOverlayCanvas;
