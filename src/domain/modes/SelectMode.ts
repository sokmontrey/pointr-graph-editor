import {IMode} from "./IMode.ts";

export class SelectMode implements IMode {
    name = "Select";

    handleMouseMove(e: MouseEvent) {
        console.log("Mouse moved at", e.clientX, e.clientY);
    }

    handleDragging(e: MouseEvent) {
        console.log("Dragging at", e.clientX, e.clientY);
    }

    handleClick(e: MouseEvent) {
        console.log("Click at", e.clientX, e.clientY);
    }
}
