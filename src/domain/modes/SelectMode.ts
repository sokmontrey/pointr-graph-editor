import {EventPropMap} from "../../hooks/event";
import {IMode} from "./IMode.ts";
import {Node, Edge} from "../graph";
import {EdgeStore, NodeStore} from "../../stores/graph";
import {Segment} from "../../utils/segment.ts";

export class SelectMode implements IMode {
    name = "Select";

    private hoveredNode: Node | null = null;
    private hoveredEdge: [Edge, Segment] | null = null;

    // TODO: store this in a store for outside access
    // (Keyboard shortcuts, etc)
    private selectedNode: Node | null = null;
    private selectedEdge: [Edge, Segment] | null = null;

    constructor(
        private nodeStore: NodeStore,
        private edgeStore: EdgeStore,
    ) { }

    handleMouseMove(props: EventPropMap["mousemove"]): void {
        this.hoveredNode = this.nodeStore.getHoveredNode(props.mousePos);
        if (this.hoveredNode) {
            this.hoveredEdge = null;
        } else {
            this.hoveredEdge = this.edgeStore.getHoveredEdge(props.mousePos);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleDragging(_props: EventPropMap["dragging"]): void {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleClick(_props: EventPropMap["click"]): void {
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

    draw(ctx: CanvasRenderingContext2D): void {
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
