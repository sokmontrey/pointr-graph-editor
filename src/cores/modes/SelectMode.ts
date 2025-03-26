import { Mode } from "../../types/Mode";

export default class SelectMode implements Mode {
    handleDragStart(e: MouseEvent): void {
        // Start selection rectangle
        console.log("Selection started at", e.clientX, e.clientY);
    }
    
    handleDrag(e: MouseEvent): void {
        // Update selection rectangle
        console.log("Selection dragging at", e.clientX, e.clientY);
    }
    
    handleDragEnd(e: MouseEvent): void {
        // Finalize selection
        console.log("Selection ended at", e.clientX, e.clientY);
    }
    
    handleClick(e: MouseEvent): void {
        // Select item at point
        console.log("Click at", e.clientX, e.clientY);
    }
    
    // TODO: remove this method all Mode
    handleWheel(e: WheelEvent): void {
        // Default wheel behavior (if not zooming)
        console.log("Wheel event", e.deltaY);
    }
}
