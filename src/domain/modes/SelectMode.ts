import {EventPropMap} from "../../hooks/event";
import {Mode} from "./Mode.ts";
import {GraphNode, GraphEdge} from "../graph";
import {EdgeStore, NodeStore} from "../../stores/graph";
import {Segment} from "../../utils/segment.ts";
import {CommandStore} from "../../stores/main";
import CommandFactory from "../../core/commands/CommandFactory.ts";
import {Vec2} from "../../utils/vector.ts";
import {snapToGrid} from "../../utils/mouse.ts";
import {GridStore} from "../../stores/canvas";
import {SelectionStore} from "../../stores/main/selectionStore.ts";

export interface GraphEntity {
    value: GraphNode | GraphEdge;
    segment?: Segment;
}

export class SelectMode extends Mode {
    name = "Select";

    private hoveredEntity: GraphEntity | null = null;
    private selectedEntity: GraphEntity | null = null;

    private draggingNode: GraphNode | null = null;
    private dragStartPos: Vec2 | null = null;

    constructor(
        private nodeStore: NodeStore,
        private edgeStore: EdgeStore,
        private gridStore: GridStore,
        private selectionStore: SelectionStore,
        private commandStore: CommandStore,
        private commandFactory: CommandFactory,
    ) {
        super();
    }

    override handleMouseMove(props: EventPropMap["mousemove"]): void {
        const nodes = this.nodeStore.getHoveredNode(props.mousePos);
        if (nodes) {
            this.hoveredEntity = {value: nodes};
            return;
        }

        const edge = this.edgeStore.getHoveredEdge(props.mousePos);
        if (edge) {
            this.hoveredEntity = {value: edge[0], segment: edge[1]};
            return;
        }

        this.hoveredEntity = null;
    }

    override handleDragging(props: EventPropMap["dragging"]): void {
        if (!this.hoveredEntity || !this.isNode(this.hoveredEntity)) {
            return;
        }

        if (!this.draggingNode) {
            this.draggingNode = this.hoveredEntity.value as GraphNode;
            this.dragStartPos = this.draggingNode.position;
        }

        const snappedPos = snapToGrid(props.mousePos, this.gridStore.gap);
        this.nodeStore.moveNode(this.draggingNode!.id, snappedPos);
    }

    override handleMouseUp(props: EventPropMap["mouseup"]): void {
        if (this.draggingNode && this.dragStartPos) {
            const snappedPos = snapToGrid(props.mousePos, this.gridStore.gap);
            const command = this.commandFactory.moveNodeCommand(
                this.draggingNode.id,
                this.dragStartPos,
                snappedPos,
            );
            this.commandStore.execute(command);
            this.dragStartPos = null;
            this.draggingNode = null;
            this.clearSelection();
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    override handleClick(_props: EventPropMap["click"]): void {
        if (this.hoveredEntity) {
            this.selectEntity(this.hoveredEntity);
        } else {
            this.clearSelection();
        }
    }

    private selectEntity(entity: GraphEntity): void {
        this.selectedEntity = entity;
        if (this.isNode(entity)) {
            this.selectionStore.setNode(entity.value.id);
        } else {
            this.selectionStore.setEdge(entity.value.id);
        }
    }

    private clearSelection(): void {
        this.selectedEntity = null;
        this.selectionStore.clear();
    }

    private isNode(entity: GraphEntity): boolean {
        return !entity.segment;
    }

    override draw(ctx: CanvasRenderingContext2D): void {
        ctx.lineWidth = 2;

        if (this.hoveredEntity) {
            if (this.isNode(this.hoveredEntity)) {
                this.drawNode(ctx, this.hoveredEntity, 'red');
            } else {
                this.drawEdge(ctx, this.hoveredEntity, 'red');
            }
        }

        if (this.selectedEntity) {
            if (this.isNode(this.selectedEntity)) {
                this.drawNode(ctx, this.selectedEntity, 'cyan');
            } else {
                this.drawEdge(ctx, this.selectedEntity, 'cyan');
            }
        }
    }

    private drawNode(ctx: CanvasRenderingContext2D, entity: GraphEntity, color: string): void {
        const node = entity.value as GraphNode;
        ctx.beginPath();
        ctx.arc(node.position.x, node.position.y, 10, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    private drawEdge(ctx: CanvasRenderingContext2D, entity: GraphEntity, color: string): void {
        const segment = entity.segment;
        if (!segment) return;
        ctx.beginPath();
        ctx.moveTo(segment.from.x, segment.from.y);
        ctx.lineTo(segment.to.x, segment.to.y);
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}
