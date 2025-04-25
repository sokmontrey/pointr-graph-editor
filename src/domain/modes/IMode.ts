import {EventPropMap} from "../../hooks/event";

export interface IMode {
    name: string;
    handleMouseMove(props: EventPropMap['mousemove']): void;
    handleDragging(props: EventPropMap['dragging']): void;
    handleClick(props: EventPropMap['click']): void;
    draw(ctx: CanvasRenderingContext2D): void;
}