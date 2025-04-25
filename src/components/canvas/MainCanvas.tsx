import Canvas, {ZIndexProps} from "./Canvas.tsx";
import {useRef} from "react";
import {useRenderingBus} from "../../hooks/useRenderingBus.ts";
import {useRenderingHandler} from "../../hooks/useRenderingHandler.ts";
import {useEventBus} from "../../hooks/useEventBus.ts";
import {useViewportStore} from "../../stores/viewportStore.ts";
import {useEventHandler} from "../../hooks/useEventHandler.ts";
import {useViewportEventAttachment} from "../../hooks/attachments/useViewportEventAttachment.ts";
import {useModeEventAttachment} from "../../hooks/attachments/useModeEventAttachment.ts";
import {useModeStore} from "../../stores/modeStore.ts";

/**
 * Responsible for main mouse interaction and graph rendering
 */
const MainCanvas = ({ zIndex }: ZIndexProps) => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    const viewport = useViewportStore();
    const mode = useModeStore();
    // const graphEngine = useGraphEngineStore();

    const renderingBus = useRenderingBus();
    const eventBus = useEventBus();

    useViewportEventAttachment(eventBus, viewport);
    useModeEventAttachment(eventBus, mode);

    useEventHandler(ref, eventBus, viewport);
    useRenderingHandler(ref, renderingBus, viewport);

    // renderingBus.subscribe(graphEngine.draw); // TODO: separate draw from the graph engine

    return ( <Canvas
        zIndex={zIndex}
        ref={ref}
        disablePointerEvent={false}
    /> );
}

export default MainCanvas;