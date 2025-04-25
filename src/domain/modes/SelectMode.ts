import {EventPropMap} from "../../hooks/useEventBus.ts";
import {IMode} from "./IMode.ts";

export class SelectMode implements IMode {
    name = "Select";

    handleMouseMove(props: EventPropMap["mousemove"]): void {
        console.log(props);
    }

    handleDragging(props: EventPropMap["dragging"]): void {
        console.log(props);
    }

    handleClick(props: EventPropMap["click"]): void {
        console.log(props);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // console.log(ctx);
    }
}
