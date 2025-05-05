import {NodeType} from "../graph";
import {EventPropMap} from "../../hooks/event";
import {Vec2} from "../../utils/vector.ts";
import {useCommandStore} from "../../stores/main";
import {snapToGrid} from "../../utils/mouse.ts";
import CreateNodeCommand from "../../core/commands/CreateNodeCommand.ts";
import {useGridStore} from "../../stores/canvas";
import Mode from "./Mode.ts";

class CreateNodeMode extends Mode {
    name = "Create";
    position: Vec2 = new Vec2(0, 0);

    constructor(
        private nodeType: NodeType,
    ) {
        super();
        this.name = "Create " + nodeType.name;
    }

    override handleMouseMove({mousePos}: EventPropMap["mousemove"]): void {
        this.calculateSnappedPosition(mousePos);
    }

    override handleClick(props: EventPropMap["click"]): void {
        this.calculateSnappedPosition(props.mousePos);
        const command = new CreateNodeCommand(
            this.nodeType,
            this.position,
        );
        useCommandStore.getState().execute(command);
    }

    override draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = 'rgb(0,196,255)';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 7, 0, 2 * Math.PI);
        ctx.stroke();
    }

    private calculateSnappedPosition(mousePos: Vec2): void {
        const gridStore = useGridStore.getState();
        const gap = gridStore.gap;
        this.position = snapToGrid(mousePos, gap);
    }
}

export default CreateNodeMode;