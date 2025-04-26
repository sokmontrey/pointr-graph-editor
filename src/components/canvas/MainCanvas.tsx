import Canvas, {ZIndexProps} from "./Canvas.tsx";
import {useRef} from "react";
import {useRenderingBus} from "../../hooks/rendering";
import {useRenderingHandler} from "../../hooks/rendering";
import {useEventBus} from "../../hooks/event";
import {useViewportStore} from "../../stores/canvas";
import {useEventHandler} from "../../hooks/event";
import {useViewportEventAttachment} from "../../hooks/attachments";
import {useModeEventAttachment} from "../../hooks/attachments";
import {useModeStore} from "../../stores/main";
import {useNodeStore} from "../../stores/graph";

/**
 * Responsible for main mouse interaction and graph rendering
 */
const MainCanvas = ({ zIndex }: ZIndexProps) => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    const viewport = useViewportStore();
    const mode = useModeStore();
    const nodeStore = useNodeStore();

    const eventBus = useEventBus();
    const renderingBus = useRenderingBus();
    renderingBus.subscribe(nodeStore.draw);

    useViewportEventAttachment(eventBus, viewport);
    useModeEventAttachment(eventBus, mode);

    useEventHandler(ref, eventBus, viewport);
    useRenderingHandler(ref, renderingBus, viewport);

    return ( <Canvas
        zIndex={zIndex}
        ref={ref}
        disablePointerEvent={false}
    /> );
}

export default MainCanvas;