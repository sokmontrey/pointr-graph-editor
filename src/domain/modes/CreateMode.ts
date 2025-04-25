import {IMode} from "./IMode.ts";
import {NodeType} from "../graph";
import {EventPropMap} from "../../hooks/useEventBus.ts";
import {Vec2} from "../../utils/vector.ts";
import {CanvasStores, MainStores} from "../../core/SingletonStores.ts";
import CreateNodeCommand from "../../core/commands/CreateNodeCommand.ts";

export class CreateMode implements IMode {
    name = "Create";
    nodeType: NodeType;

    currentMousePos: Vec2 = new Vec2(0, 0);

    constructor(nodeType: NodeType) {
        this.name = "Create " + nodeType.name;
        this.nodeType = nodeType;
    }

    handleMouseMove({mousePos}: EventPropMap["mousemove"]): void {
        this.calculateSnappedPosition(mousePos);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleDragging(_props: EventPropMap["dragging"]): void { }

    handleClick(props: EventPropMap["click"]): void {
        this.calculateSnappedPosition(props.mousePos);
        MainStores.commandStore.execute(
            new CreateNodeCommand(this.nodeType, this.currentMousePos)
        );
    }

    private calculateSnappedPosition(mousePos: Vec2): void {
        const gap = CanvasStores.gridStore.gap;
        // TODO: improve snapping closer to actual mouse pos
        this.currentMousePos = mousePos.round(gap).subtract(Vec2.fromNumber(gap / 2));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.currentMousePos.x, this.currentMousePos.y, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

