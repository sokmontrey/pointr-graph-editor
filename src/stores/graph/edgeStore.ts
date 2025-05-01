import {create} from 'zustand';
import {GraphEdge} from "../../domain/graph";
import {useNodeStore} from "./nodeStore.ts";
import {Vec2} from "../../utils/vector.ts";
import {Segment} from "../../utils/segment.ts";

export interface EdgeState {
    edges: GraphEdge[];
}

export interface EdgeAction {
    addEdge: (fromId: string, toId: string, id?: string | null) => string | null;
    removeEdge: (id: string) => void;
    removeEdgesConnectedToNode: (nodeId: string) => void;
    loadEdges: (edges: GraphEdge[]) => void;
    clearEdges: () => void;
    draw: (ctx: CanvasRenderingContext2D) => void;
    getHoveredEdge: (position: Vec2) => [GraphEdge, Segment] | null;
    getConnectedNodes: (nodeId: string) => string[];
    find: (edgeId: string) => GraphEdge | null;
}

export type EdgeStore = EdgeState & EdgeAction;

export const useEdgeStore = create<EdgeStore>((set, get) => ({
    edges: [],
    addEdge: (fromId, toId, id = null) => {
        const {edges} = get();
        if (edges.some(edge => edge.from === fromId && edge.to === toId)) {
            return null; // Edge already exists
        }

        // Check if nodes exist
        const {nodes} = useNodeStore.getState();
        const fromNodeExists = nodes.some(node => node.id === fromId);
        const toNodeExists = nodes.some(node => node.id === toId);

        if (!fromNodeExists || !toNodeExists) {
            console.warn(`Cannot create edge: node ${!fromNodeExists ? fromId : toId} does not exist`);
            return null;
        }

        id ??= `${fromId}-${toId}-${Date.now()}`;
        const newEdge: GraphEdge = {
            id,
            from: fromId,
            to: toId,
        };
        set({edges: [...edges, newEdge]});
        return id;
    },
    removeEdge: (id) => {
        const {edges} = get();
        set({edges: edges.filter(edge => edge.id !== id)});
    },
    removeEdgesConnectedToNode: (nodeId) => {
        const {edges} = get();
        set({
            edges: edges.filter(edge => edge.from !== nodeId && edge.to !== nodeId),
        });
    },
    loadEdges: (edges) => set({edges}),
    clearEdges: () => set({edges: []}),
    getHoveredEdge: (position) => {
        const {edges} = get();
        for (const edge of edges) {
            const fromNode = useNodeStore.getState().nodes.find(node => node.id === edge.from);
            const toNode = useNodeStore.getState().nodes.find(node => node.id === edge.to);
            if (!fromNode || !toNode) {
                continue;
            }
            const segment = new Segment(fromNode.position, toNode.position);
            if (segment.isHovered(position, 10)){
                return [edge, segment];
            }
        }
        return null;
    },
    getConnectedNodes: (nodeId) => {
        const {edges} = get();
        return edges
            .filter(edge => edge.from === nodeId || edge.to === nodeId)
            .map(edge => edge.from === nodeId ? edge.to : edge.from);
    },
    find: (edgeId) => {
        const {edges} = get();
        return edges.find(edge => edge.id === edgeId) ?? null;
    },
    draw: (ctx) => {
        const {edges} = get();
        edges.forEach(edge => {
            const fromNode = useNodeStore.getState().nodes.find(node => node.id === edge.from);
            const toNode = useNodeStore.getState().nodes.find(node => node.id === edge.to);
            if (!fromNode || !toNode) return;

            ctx.beginPath();
            ctx.moveTo(fromNode.position.x, fromNode.position.y);
            ctx.lineTo(toNode.position.x, toNode.position.y);
            ctx.strokeStyle = 'black';
            ctx.stroke();
        });
    },
}));