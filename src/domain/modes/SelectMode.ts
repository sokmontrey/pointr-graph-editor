import {EventPropMap} from "../../hooks/event";
import {Mode} from "./Mode.ts";
import {Node, Edge} from "../graph";
import {EdgeStore, NodeStore} from "../../stores/graph";
import {Segment} from "../../utils/segment.ts";
import {CommandStore} from "../../stores/main";
import CommandFactory from "../../core/commands/CommandFactory.ts";
import {Vec2} from "../../utils/vector.ts";
import {snapToGrid} from "../../utils/mouse.ts";
import {GridStore} from "../../stores/canvas";

// TODO: refactor to achieve single responsibility principle
export class SelectMode extends Mode {
    name = "Select";

    private hoveredNode: Node | null = null;
    private hoveredEdge: [Edge, Segment] | null = null;

    private isDragging: boolean = false;
    private dragStartPos: Vec2 | null = null;
    private draggingNode: Node | null = null;

    // TODO: store this in a store for outside access
    // (Keyboard shortcuts, etc)
    private selectedNode: Node | null = null;
    private selectedEdge: [Edge, Segment] | null = null;

    constructor(
        private nodeStore: NodeStore,
        private edgeStore: EdgeStore,
        private gridStore: GridStore,
        private commandStore: CommandStore,
        private commandFactory: CommandFactory,
    ) {
        super();
    }

    override handleMouseMove(props: EventPropMap["mousemove"]): void {
        this.hoveredNode = this.nodeStore.getHoveredNode(props.mousePos);
        if (this.hoveredNode) {
            this.hoveredEdge = null;
        } else {
            this.hoveredEdge = this.edgeStore.getHoveredEdge(props.mousePos);
        }
    }

    override handleDragging(props: EventPropMap["dragging"]): void {
        this.draggingNode = this.hoveredNode;

        if (!this.draggingNode) {
            return;
        }

        if (!this.isDragging) {
            this.isDragging = true;
            this.dragStartPos = props.mousePos;
        }

        const snappedPos = snapToGrid(props.mousePos, this.gridStore.gap);
        this.nodeStore.moveNode(this.draggingNode.id, snappedPos);
    }

    override handleMouseUp(props: EventPropMap["mouseup"]): void {
        if (this.isDragging &&
            this.draggingNode &&
            this.dragStartPos
        ) {
            const snappedPos = snapToGrid(props.mousePos, this.gridStore.gap);
            const command = this.commandFactory.moveNodeCommand(
                this.draggingNode.id,
                this.dragStartPos,
                snappedPos,
            );
            this.commandStore.execute(command);
            this.isDragging = false;
            this.dragStartPos = null;
            this.selectedNode = null;
            this.draggingNode = null;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    override handleClick(_props: EventPropMap["click"]): void {
        if (this.hoveredNode) {
            this.selectedNode = this.hoveredNode;
            this.selectedEdge = null;
            return;
        }

        if (this.hoveredEdge) {
            this.selectedEdge = this.hoveredEdge;
            this.selectedNode = null;
            return;
        }

        this.selectedNode = null;
        this.selectedEdge = null;
    }

    override draw(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = 2;
        this.drawNode(ctx, this.hoveredNode, 'red');
        this.drawEdge(ctx, this.hoveredEdge, 'red');
        this.drawNode(ctx, this.selectedNode, 'cyan');
        this.drawEdge(ctx, this.selectedEdge, 'cyan');
    }

    private drawNode(ctx: CanvasRenderingContext2D, node: Node | null, color: string): void {
        if (!node) return;
        ctx.beginPath();
        ctx.arc(node.position.x, node.position.y, 10, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    private drawEdge(ctx: CanvasRenderingContext2D, edge: [Edge, Segment] | null, color: string): void {
        if (!edge) return;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_edge, segment] = edge;
        ctx.beginPath();
        ctx.moveTo(segment.from.x, segment.from.y);
        ctx.lineTo(segment.to.x, segment.to.y);
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}
