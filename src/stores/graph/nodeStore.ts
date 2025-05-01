import {create} from 'zustand';
import {GraphNode, NodeType} from "../../domain/graph";
import {Vec2} from "../../utils/vector.ts";

export interface NodeState {
    nodes: GraphNode[];
}

export interface NodeAction {
    addNode: (label: string, position: Vec2, nodeType: NodeType, id?: string | null) => string;
    removeNode: (id: string) => void;
    moveNode: (id: string, position: Vec2) => void;
    updateNodeLabel: (id: string, newLabel: string) => void;
    loadNodes: (nodes: GraphNode[]) => void;
    clearNodes: () => void;
    draw: (ctx: CanvasRenderingContext2D) => void;
    getHoveredNode: (position: Vec2) => GraphNode | null;
    find: (id: string) => GraphNode | null;
}

export type NodeStore = NodeState & NodeAction;

export const useNodeStore = create<NodeStore>((set, get) => ({
    nodes: [],
    addNode: (label, position, nodeType, id = null) => {
        const {nodes} = get();
        id ??= Date.now().toString();
        const newNode: GraphNode = {
            id,
            label,
            type: nodeType,
            position,
        };
        set({nodes: [...nodes, newNode]});
        return id;
    },
    removeNode: (id) => {
        const {nodes} = get();
        set({
            nodes: nodes.filter(node => node.id !== id),
        });
    },
    moveNode: (id, position) => {
        const {nodes} = get();
        set({
            nodes: nodes.map(node => node.id === id ? {...node, position} : node),
        });
    },
    // TODO: update label instead of id
    updateNodeLabel: (id, newLabel) => {
        const {nodes} = get();
        set({
            nodes: nodes.map(node => node.id === id
                ? {...node, label: newLabel}
                : node),
        });
    },
    loadNodes: (nodes) => set({nodes}),
    clearNodes: () => set({nodes: []}),
    getHoveredNode: (position) => {
        const {nodes} = get();
        return nodes.find(node => node.position.distance(position) < 10) ?? null;
    },
    find: (id) => {
        const {nodes} = get();
        return nodes.find(node => node.id === id) ?? null;
    },
    draw: (ctx) => {
        const {nodes} = get();
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.position.x, node.position.y, 10, 0, 2 * Math.PI);
            ctx.fillStyle = node.type.color;
            ctx.fill();

            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "12px Arial";
            ctx.fillText(node.label, node.position.x, node.position.y + 20);
        });
    },
}));