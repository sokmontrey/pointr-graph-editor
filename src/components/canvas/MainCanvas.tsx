import Canvas from "./Canvas.tsx";
import {useRef, useEffect} from "react";
import {useRenderingBus} from "../../hooks/useRenderingBus.ts";
import {useRenderingHandler} from "../../hooks/useRenderingHandler.ts";
import {MouseButton, useEventBus} from "../../hooks/useEventBus.ts";
import {useViewportStore} from "../../stores/viewportStore.ts";
import {useEventHandler} from "../../hooks/useEventHandler.ts";

const MainCanvas = () => {
    const ref = useRef<HTMLCanvasElement | null>(null);

    const viewport = useViewportStore();
    // const graphEngine = useGraphEngineStore();

    const renderingBus = useRenderingBus();
    const eventBus = useEventBus();

    useEventHandler(ref, eventBus);
    useRenderingHandler(ref, renderingBus, viewport);

    useEffect(() => {
        // renderingBus.subscribe(graphEngine.draw); // TODO: separate draw from the graph engine
        renderingBus.subscribe((ctx: CanvasRenderingContext2D) => {
            ctx.fillStyle = 'red';
            ctx.fillRect(0, 0, 100, 100);
        });

        const unsubscribeZoom = eventBus.subscribe('wheel', ({deltaY, mousePos}) => {
            const factor = deltaY > 0 ? 0.9 : 1.1;
            viewport.zoom(factor, mousePos);
        });

        const unsubscribePan = eventBus.subscribe('dragging', ({movement, buttons}) => {
            if (buttons === MouseButton.Middle) {
                viewport.pan(movement);
            }
        });

        return () => {
            unsubscribeZoom();
            unsubscribePan();
        };
    }, [eventBus, viewport]);

    return ( <Canvas
        zIndex={10}
        ref={ref}
        disablePointerEvent={false}
    /> );
}

export default MainCanvas;