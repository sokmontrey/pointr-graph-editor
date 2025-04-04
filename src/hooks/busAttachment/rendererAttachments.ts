import { useEffect } from "react";
import { RenderBus, RenderFunction } from "../../types";

export const useAttachImageOverlayRenderer = (
    renderBus: RenderBus,
    draw: RenderFunction,
) => {
    useEffect(() => {
        return renderBus.subscribe(draw);
    }, [renderBus, draw]);
};