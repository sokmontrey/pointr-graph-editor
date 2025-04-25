import {EventPropMap} from "../../hooks/event";
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    draw(_ctx: CanvasRenderingContext2D): void {
        // console.log(ctx);
    }
}
