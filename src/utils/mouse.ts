import { createVec2, Vec2 } from "./vector";

export const getMousePosition = (
    e: MouseEvent | WheelEvent,
    offset: Vec2,
    scale: number,
): Vec2 => {
    const canvas = e.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    return createVec2(
        (e.clientX - rect.left - offset.x) / scale,
        (e.clientY - rect.top - offset.y) / scale,
    );
}

export const snapToGrid = (position: Vec2, gap: number): Vec2 => {
    const halfGap = Vec2.fromNumber(gap / 2);
    return position
        .add(halfGap)
        .round(gap)
        .subtract(halfGap);
}

