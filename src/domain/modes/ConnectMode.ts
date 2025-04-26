import {EventPropMap} from "../../hooks/event";
import {CommandStore} from "../../stores/main";
import {IMode} from "./IMode.ts";
import {NodeStore} from "../../stores/graph";
import CommandFactory from "../../core/commands/CommandFactory.ts";
import {Node} from "../graph";
import {Vec2} from "../../utils/vector.ts";

export class ConnectMode implements IMode {
    name = 'connect';
    private hoveredNode: Node | null = null;
    private selectedNode: Node | null = null;
    private mousePos: Vec2 = new Vec2(0, 0);

    constructor(
        private nodeStore: NodeStore,
        private commandStore: CommandStore,
        private commandFactory: CommandFactory,
    ) { }

    handleMouseMove(props: EventPropMap["mousemove"]): void {
        this.mousePos = props.mousePos;
        this.hoveredNode = this.getHoveredNode();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleDragging(_props: EventPropMap["dragging"]): void {
    }

    handleClick(props: EventPropMap["click"]): void {
        this.mousePos = props.mousePos;
        this.hoveredNode = this.getHoveredNode();

        if (this.selectedNode) {
            // const command = this.commandFactory.createEdgeCommand(
            //     this.selectedNode.id,
            //     this.hoveredNode!.id,
            // );
            // this.commandStore.execute(command);
            this.reset();
        } else {
            this.selectedNode = this.hoveredNode;
        }
    }

    private getHoveredNode(): Node | null {
        const {nodes} = this.nodeStore;
        const hoveredNode = nodes.find(node => node.position.distance(this.mousePos) < 10);
        return hoveredNode ?? null;
    }

    private reset() {
        this.selectedNode = null;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if (this.hoveredNode) {
            ctx.beginPath();
            ctx.arc(this.hoveredNode.position.x, this.hoveredNode.position.y, 10, 0, 2 * Math.PI);
            ctx.strokeStyle = 'red';
            ctx.stroke();
        }

        if (this.selectedNode) {
            ctx.beginPath();
            ctx.arc(this.selectedNode.position.x, this.selectedNode.position.y, 10, 0, 2 * Math.PI);
            ctx.strokeStyle = 'green';
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.selectedNode.position.x, this.selectedNode.position.y);
            ctx.lineTo(this.mousePos.x, this.mousePos.y);
            ctx.strokeStyle = 'green';
            ctx.stroke();
        }
    }
}