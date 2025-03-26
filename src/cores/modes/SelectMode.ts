import { Mode } from "../../types/Mode";

export default class SelectMode implements Mode {
    handleDragStart(e: MouseEvent): void {
        throw new Error("Method not implemented.");
    }
    handleDrag(e: MouseEvent): void {
        throw new Error("Method not implemented.");
    }
    handleDragEnd(e: MouseEvent): void {
        throw new Error("Method not implemented.");
    }
    handleClick(e: MouseEvent): void {
        throw new Error("Method not implemented.");
    }
    handleWheel(e: WheelEvent): void {
        throw new Error("Method not implemented.");
    }
}