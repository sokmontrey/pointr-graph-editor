import { EventPropMap } from "../../hooks/useEventBus.ts";
import {IMode} from "./IMode.ts";

export class SelectMode implements IMode {
    name = "Select";
    handleMouseMove(props: EventPropMap["mousemove"]): void {
        throw new Error("Method not implemented.");
    }
    handleDragging(props: EventPropMap["dragging"]): void {
        throw new Error("Method not implemented.");
    }
    handleClick(props: EventPropMap["click"]): void {
        throw new Error("Method not implemented.");
    }
}
