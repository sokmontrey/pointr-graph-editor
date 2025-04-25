import {EventPropMap} from "../../hooks/useEventBus.ts";

export interface IMode {
    name: string;
    handleMouseMove(props: EventPropMap['mousemove']): void;
    handleDragging(props: EventPropMap['dragging']): void;
    handleClick(props: EventPropMap['click']): void;
}