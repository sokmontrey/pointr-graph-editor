import {Mode} from "./Mode.ts";
import {NodeType} from "../graph";
import {EventPropMap} from "../../hooks/event";
import {Vec2} from "../../utils/vector.ts";
import {GridStore} from "../../stores/canvas";
import CommandFactory from "../../core/commands/CommandFactory.ts";
import {CommandStore} from "../../stores/main";
import {snapToGrid} from "../../utils/mouse.ts";

export class CreateNodeMode extends Mode {
    name = "Create";
    position: Vec2 = new Vec2(0, 0);

    constructor(
        private nodeType: NodeType,
        private gridStore: GridStore,
        private commandStore: CommandStore,
        private commandFactory: CommandFactory,
    ) {
        super();
        this.name = "Create " + nodeType.name;
    }

    override handleMouseMove({mousePos}: EventPropMap["mousemove"]): void {
        this.calculateSnappedPosition(mousePos);
    }

    override handleClick(props: EventPropMap["click"]): void {
        this.calculateSnappedPosition(props.mousePos);
        const command = this.commandFactory.createNodeCommand(
            this.nodeType,
            this.position,
        );
        this.commandStore.execute(command);
    }

    override draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }

    private calculateSnappedPosition(mousePos: Vec2): void {
        const gap = this.gridStore.gap;
        this.position = snapToGrid(mousePos, gap);
    }
}

