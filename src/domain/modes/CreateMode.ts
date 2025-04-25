import {IMode} from "./IMode.ts";
import {NodeType} from "../graph";
import {EventPropMap} from "../../hooks/useEventBus.ts";
import {Vec2} from "../../utils/vector.ts";
import CreateNodeCommand from "../../core/commands/CreateNodeCommand.ts";
import {GridStore} from "../../stores/canvas";
import {CommandStore} from "../../stores/main";

export interface CreateModeProps {
    nodeType: NodeType;
    commandStore: CommandStore;
    gridStore: GridStore;
}

export class CreateMode implements IMode {
    name = "Create";
    nodeType: NodeType;
    commandStore: CommandStore;
    gridStore: GridStore;
    position: Vec2 = new Vec2(0, 0);

    constructor({
                    nodeType,
                    commandStore,
                    gridStore
                }: CreateModeProps) {
        this.name = "Create " + nodeType.name;
        this.commandStore = commandStore;
        this.gridStore = gridStore;
        this.nodeType = nodeType;
    }

    handleMouseMove({mousePos}: EventPropMap["mousemove"]): void {
        this.calculateSnappedPosition(mousePos);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleDragging(_props: EventPropMap["dragging"]): void { }

    handleClick(props: EventPropMap["click"]): void {
        this.calculateSnappedPosition(props.mousePos);
        this.commandStore.execute(
            new CreateNodeCommand(this.nodeType, this.position)
        );
    }

    private calculateSnappedPosition(mousePos: Vec2): void {
        const gap = this.gridStore.gap;
        // TODO: improve snapping closer to actual mouse pos
        this.position = mousePos.round(gap).subtract(Vec2.fromNumber(gap / 2));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

