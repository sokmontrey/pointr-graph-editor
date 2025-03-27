export interface Mode {
    name: string;
    handleDragging(e: MouseEvent): void;
    handleDragEnd(e: MouseEvent): void;
    handleClick(e: MouseEvent): void;
    handleMouseMove(e: MouseEvent): void;
}