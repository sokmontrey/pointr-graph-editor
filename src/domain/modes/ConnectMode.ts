import {EventPropMap} from "../../hooks/event";
import {useCommandStore} from "../../stores/main";
import {useNodeStore} from "../../stores/graph";
import {GraphNode} from "../graph";
import {Vec2} from "../../utils/vector.ts";
import ConnectCommand from "../../core/commands/ConnectCommand.ts";
import Mode from "./Mode.ts";

class ConnectMode extends Mode {
    name = 'connect';
    private hoveredNode: GraphNode | null = null;
    private selectedNode: GraphNode | null = null;
    private mousePos: Vec2 = new Vec2(0, 0);

    override handleMouseMove(props: EventPropMap["mousemove"]): void {
        const nodeStore = useNodeStore.getState();

        this.mousePos = props.mousePos;
        this.hoveredNode = nodeStore.getHoveredNode(props.mousePos);
    }

    override handleClick(props: EventPropMap["click"]): void {
        const nodeStore = useNodeStore.getState();

        this.mousePos = props.mousePos;
        this.hoveredNode = nodeStore.getHoveredNode(props.mousePos);

        if (!this.hoveredNode) {
            this.reset();
            return;
        }

        if (!this.selectedNode) {
            this.selectedNode = this.hoveredNode;
            return;
        }

        if (this.selectedNode === this.hoveredNode) return;

        const command = new ConnectCommand(this.selectedNode.id, this.hoveredNode!.id);
        useCommandStore.getState().execute(command);
        this.reset();
    }

    override draw(ctx: CanvasRenderingContext2D): void {
        const hoverColor = 'rgba(0,149,255,0.68)';
        const connectColor = '#3cef67';

        ctx.lineWidth = 2;

        if (this.hoveredNode) {
            ctx.beginPath();
            ctx.arc(this.hoveredNode.position.x, this.hoveredNode.position.y, 10, 0, 2 * Math.PI);
            ctx.strokeStyle = hoverColor;
            ctx.stroke();
        }

        if (this.selectedNode) {
            ctx.beginPath();
            ctx.arc(this.selectedNode.position.x, this.selectedNode.position.y, 10, 0, 2 * Math.PI);
            ctx.strokeStyle = connectColor;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.selectedNode.position.x, this.selectedNode.position.y);
            ctx.lineTo(this.mousePos.x, this.mousePos.y);
            ctx.strokeStyle = connectColor;
            ctx.stroke();
        }
    }

    private reset() {
        this.selectedNode = null;
    }
}

export default ConnectMode;