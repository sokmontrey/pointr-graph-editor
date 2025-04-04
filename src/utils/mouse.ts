import { createVec2, Vec2 } from "./vector";

export const getMousePosition = (e: MouseEvent | WheelEvent): Vec2 => {
    const canvas = e.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    return createVec2(
        e.clientX - rect.left,
        e.clientY - rect.top,
    );
}