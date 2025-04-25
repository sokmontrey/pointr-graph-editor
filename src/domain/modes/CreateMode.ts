import {IMode} from "./IMode.ts";
import {NodeType} from "../graph/node.ts";
import {EventPropMap} from "../../hooks/useEventBus.ts";
import {Vec2} from "../../utils/vector.ts";

export class CreateMode implements IMode {
    name = "Create";
    nodeType: NodeType;

    currentMousePos: Vec2 = new Vec2(0, 0);

    constructor(nodeType: NodeType) {
        this.name = "Create " + nodeType.name;
        this.nodeType = nodeType;
    }

    handleMouseMove(props: EventPropMap["mousemove"]): void {
        this.currentMousePos = props.mousePos;
    }

    handleDragging(props: EventPropMap["dragging"]): void {
        console.log(props);
    }

    handleClick(props: EventPropMap["click"]): void {
        console.log(props);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.currentMousePos.x, this.currentMousePos.y, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

