export interface IMode {
    name: string;
    handleMouseMove(e: MouseEvent): void;
    handleDragging(e: MouseEvent): void;
    handleClick(e: MouseEvent): void;
}