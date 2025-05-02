import {EventPropMap} from "../../hooks/event";
import {GraphNode, GraphEdge} from "../graph";
import {useEdgeStore, useNodeStore} from "../../stores/graph";
import {Segment} from "../../utils/segment.ts";
import {Vec2} from "../../utils/vector.ts";
import {snapToGrid} from "../../utils/mouse.ts";
import MoveNodeCommand from "../../core/commands/MoveNodeCommand.ts";
import {useCommandStore} from "../../stores/main";
import {useSelectionStore} from "../../stores/main/selectionStore.ts";
import {useGridStore} from "../../stores/canvas";
import Mode from "./Mode.ts";

export interface GraphEntity {
    value: GraphNode | GraphEdge;
    segment?: Segment;
}

class SelectMode extends Mode {
    name = "Select";

    private hoveredEntity: GraphEntity | null = null;
    private selectedEntity: GraphEntity | null = null;

    private draggingNode: GraphNode | null = null;
    private dragStartPos: Vec2 | null = null;

    override handleMouseMove(props: EventPropMap["mousemove"]): void {
        const nodes = useNodeStore.getState().getHoveredNode(props.mousePos);
        if (nodes) {
            this.hoveredEntity = {value: nodes};
            return;
        }

        const edgeStore = useEdgeStore.getState();
        const edge = edgeStore.getHoveredEdge(props.mousePos);
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

        const nodeStore = useNodeStore.getState();
        const { gap } = useGridStore.getState();
        const snappedPos = snapToGrid(props.mousePos, gap);
        nodeStore.moveNode(this.draggingNode!.id, snappedPos);
    }

    override handleMouseUp(props: EventPropMap["mouseup"]): void {
        if (this.draggingNode && this.dragStartPos) {
            const { gap } = useGridStore.getState();
            const snappedPos = snapToGrid(props.mousePos, gap);
            const command = new MoveNodeCommand(
                this.draggingNode.id,
                this.dragStartPos,
                snappedPos,
            );
            useCommandStore.getState().execute(command);
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
        const selectionStore = useSelectionStore.getState();
        if (this.isNode(entity)) {
            selectionStore.setNode(entity.value.id);
        } else {
            selectionStore.setEdge(entity.value.id);
        }
    }

    private clearSelection(): void {
        this.selectedEntity = null;
        useSelectionStore.getState().clear();
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

export default SelectMode;