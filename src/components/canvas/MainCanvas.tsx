import Canvas, {ZIndexProps} from "./Canvas.tsx";
import {useRef} from "react";
import {useRenderingBus} from "../../hooks/rendering";
import {useRenderingHandler} from "../../hooks/rendering";
import {useEventBus} from "../../hooks/event";
import {useViewportStore} from "../../stores/canvas";
import {useEventHandler} from "../../hooks/event";
import {useViewportEventAttachment} from "../../hooks/attachments";
import {useModeEventAttachment} from "../../hooks/attachments";
import {useCommandStore, useModeStore} from "../../stores/main";
import {useEdgeStore, useNodeStore} from "../../stores/graph";
import {useCommandEventAttachment} from "../../hooks/attachments";
import {useSelectionEventAttachment} from "../../hooks/attachments";
import {useSelectionStore} from "../../stores/main/selectionStore.ts";

/**
 * Responsible for main mouse interaction and graph rendering
 */
const MainCanvas = ({ zIndex }: ZIndexProps) => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    const mode = useModeStore();
    const viewport = useViewportStore();
    const nodeStore = useNodeStore();
    const edgeStore = useEdgeStore();
    const commandStore = useCommandStore();
    const selectionStore = useSelectionStore();

    const eventBus = useEventBus();
    const renderingBus = useRenderingBus();
    renderingBus.subscribe(edgeStore.draw);
    renderingBus.subscribe(nodeStore.draw);

    useViewportEventAttachment(eventBus, viewport);
    useModeEventAttachment(eventBus, mode);
    useCommandEventAttachment(eventBus, commandStore);
    useSelectionEventAttachment(eventBus, selectionStore);

    useEventHandler(ref, eventBus, viewport);
    useRenderingHandler(ref, renderingBus, viewport);

    return ( <Canvas
        zIndex={zIndex}
        ref={ref}
        disablePointerEvent={false}
    /> );
}

export default MainCanvas;