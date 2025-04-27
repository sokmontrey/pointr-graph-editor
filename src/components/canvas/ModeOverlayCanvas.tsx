import Canvas, {ZIndexProps} from "./Canvas.tsx";
import {useEffect, useRef} from "react";
import {useRenderingBus} from "../../hooks/rendering";
import {useRenderingHandler} from "../../hooks/rendering";
import {useViewportStore} from "../../stores/canvas";
import {useModeStore} from "../../stores/main";

const ModeOverlayCanvas = ({ zIndex }: ZIndexProps) => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    const viewport = useViewportStore();
    const mode = useModeStore();

    const renderingBus = useRenderingBus();
    useRenderingHandler(ref, renderingBus, viewport, true);

    useEffect(() => {
        renderingBus.clear();
        renderingBus.subscribe(mode.mode.draw.bind(mode.mode));
    }, [mode, renderingBus]);

    return ( <Canvas
        zIndex={zIndex}
        ref={ref}
        disablePointerEvent={true}
    /> );
}

export default ModeOverlayCanvas;
