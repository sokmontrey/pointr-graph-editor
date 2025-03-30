import { createPoint, Point } from "./point";

export const getMousePosition = (e: MouseEvent | WheelEvent): Point => {
    const canvas = e.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    return createPoint(
        e.clientX - rect.left,
        e.clientY - rect.top,
    );
}