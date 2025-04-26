import {EventPropMap} from "../../hooks/event";

export abstract class Mode {
    name: string = '';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleMouseMove(_props: EventPropMap['mousemove']): void {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleMouseUp(_props: EventPropMap['mouseup']): void {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleDragging(_props: EventPropMap['dragging']): void {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleClick(_props: EventPropMap['click']): void {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    draw(_ctx: CanvasRenderingContext2D): void {
    }
}