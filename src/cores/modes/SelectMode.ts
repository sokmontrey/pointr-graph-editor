import { Mode } from "../../types/Mode";

export default class SelectMode implements Mode {
    public readonly name: string = "Select";

    handleMouseMove(e: MouseEvent): void {
        console.log("Mouse moved at", e.clientX, e.clientY);
    }

    handleDragging(e: MouseEvent): void {
        console.log("Dragging at", e.clientX, e.clientY);
    }

    handleDragEnd(e: MouseEvent): void {
        console.log("Selection ended at", e.clientX, e.clientY);
    }
    
    handleClick(e: MouseEvent): void {
        console.log("Click at", e.clientX, e.clientY);
    }
}
