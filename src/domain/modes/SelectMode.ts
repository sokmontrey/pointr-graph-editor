import {EventPropMap} from "../../hooks/event";
import {IMode} from "./IMode.ts";
import {Node, Edge} from "../graph";
import {EdgeStore, NodeStore} from "../../stores/graph";
import {Segment} from "../../utils/segment.ts";

export class SelectMode implements IMode {
    name = "Select";

    private hoveredNode: Node | null = null;
    private hoveredEdge: [Edge, Segment] | null = null;

    private selectedNode: Node | null = null;
    private selectedEdge: [Edge, Segment] | null = null;

    constructor(
        private nodeStore: NodeStore,
        private edgeStore: EdgeStore,
    ) { }

    handleMouseMove(props: EventPropMap["mousemove"]): void {
        this.hoveredNode = this.nodeStore.getHoveredNode(props.mousePos);
        this.hoveredEdge = this.edgeStore.getHoveredEdge(props.mousePos);
    }

    handleDragging(props: EventPropMap["dragging"]): void {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleClick(_props: EventPropMap["click"]): void {
        if (this.hoveredNode) {
            this.selectedNode = this.hoveredNode;
            return;
        }

        if (this.hoveredEdge) {
            this.selectedEdge = this.hoveredEdge;
            return;
        }

        this.selectedNode = null;
        this.selectedEdge = null;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.drawHoveredNode(ctx);
        this.drawHoveredEdge(ctx);
        this.drawSelectedNode(ctx);
        this.drawSelectedEdge(ctx);
    }

    private drawHoveredNode(ctx: CanvasRenderingContext2D): void {
        if (!this.hoveredNode) return;
        ctx.beginPath();
        ctx.arc(this.hoveredNode.position.x, this.hoveredNode.position.y, 10, 0, 2 * Math.PI);
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }

    private drawHoveredEdge(ctx: CanvasRenderingContext2D): void {
        if (!this.hoveredEdge) return;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_edge, segment] = this.hoveredEdge;
        ctx.beginPath();
        ctx.moveTo(segment.from.x, segment.from.y);
        ctx.lineTo(segment.to.x, segment.to.y);
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }

    private drawSelectedNode(ctx: CanvasRenderingContext2D): void {
        if (!this.selectedNode) return;
        ctx.beginPath();
        ctx.arc(this.selectedNode.position.x, this.selectedNode.position.y, 10, 0, 2 * Math.PI);
        ctx.strokeStyle = 'green';
        ctx.stroke();
    }

    private drawSelectedEdge(ctx: CanvasRenderingContext2D): void {
        if (!this.selectedEdge) return;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_edge, segment] = this.selectedEdge;
        ctx.beginPath();
        ctx.moveTo(segment.from.x, segment.from.y);
        ctx.lineTo(segment.to.x, segment.to.y);
        ctx.strokeStyle = 'green';
        ctx.stroke();
    }
}
