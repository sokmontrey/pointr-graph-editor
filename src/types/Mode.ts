export interface Mode {
    handleDragStart(e: MouseEvent): void;
    handleDrag(e: MouseEvent): void;
    handleDragEnd(e: MouseEvent): void;
    handleClick(e: MouseEvent): void;
    handleWheel(e: WheelEvent): void;
}


export enum ModeType {
    SELECT = "Select",
}