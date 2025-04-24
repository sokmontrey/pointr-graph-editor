import Canvas from "./Canvas.tsx";
import {useRef} from "react";
import {useRenderingBus} from "../../hooks/useRenderingBus.ts";
import {useRenderingHandler} from "../../hooks/useRenderingHandler.ts";
import {useEventBus} from "../../hooks/useEventBus.ts";
import {useViewportStore} from "../../stores/viewportStore.ts";
import {useEventHandler} from "../../hooks/useEventHandler.ts";
import {useViewportEventAttachment} from "../../hooks/attachments/useViewportEventAttachment.ts";

const MainCanvas = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    const viewport = useViewportStore();
    // const graphEngine = useGraphEngineStore();

    const renderingBus = useRenderingBus();
    const eventBus = useEventBus();

    useViewportEventAttachment(eventBus, viewport);

    useEventHandler(ref, eventBus);
    useRenderingHandler(ref, renderingBus, viewport);

    // renderingBus.subscribe(graphEngine.draw); // TODO: separate draw from the graph engine

    return ( <Canvas
        zIndex={10}
        ref={ref}
        disablePointerEvent={false}
    /> );
}

export default MainCanvas;