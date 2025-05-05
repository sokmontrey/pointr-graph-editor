import {create} from 'zustand';
import {GraphEdge} from "../../domain/graph";
import {useNodeStore} from "./nodeStore.ts";
import {Vec2} from "../../utils/vector.ts";
import {Segment} from "../../utils/segment.ts";
import EdgeIndex from "../../utils/edgeIndex.ts";

export interface EdgeState {
    edges: GraphEdge[];
    edgeIndex: EdgeIndex;
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
    edgeIndex: new EdgeIndex(),

    addEdge: (fromId, toId, id = null) => {
        const {edges, edgeIndex} = get();

        if (edgeIndex.hasConnection(fromId, toId)) {
            return null; // Edge already exists
        }

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

        const updatedEdges = [...edges, newEdge];
        edgeIndex.add(newEdge);

        set({edges: updatedEdges});
        return id;
    },

    removeEdge: (id) => {
        const {edges, edgeIndex} = get();
        edgeIndex.remove(id);
        set({edges: edges.filter(edge => edge.id !== id)});
    },

    removeEdgesConnectedToNode: (nodeId) => {
        const {edges, edgeIndex} = get();
        const connectedEdges = edgeIndex.getEdgesConnectedToNode(nodeId);
        const connectedEdgeIds = new Set(connectedEdges.map(edge => edge.id));
        for (const edge of connectedEdges) {
            edgeIndex.remove(edge.id);
        }
        set({
            edges: edges.filter(edge => !connectedEdgeIds.has(edge.id)),
        });
    },

    loadEdges: (edges) => {
        const edgeIndex = new EdgeIndex();
        edgeIndex.rebuild(edges);
        set({edges, edgeIndex});
    },

    clearEdges: () => {
        const {edgeIndex} = get();
        edgeIndex.clear();
        set({edges: []});
    },

    getHoveredEdge: (position) => {
        const {edges} = get();
        const nodeStore = useNodeStore.getState();

        // TODO: This could be further optimized with a spatial index for edges
        // For now, optimize the node lookups
        for (const edge of edges) {
            const fromNode = nodeStore.find(edge.from);
            const toNode = nodeStore.find(edge.to);

            if (!fromNode || !toNode) {
                continue;
            }

            const segment = new Segment(fromNode.position, toNode.position);
            if (segment.isHovered(position, 10)) {
                return [edge, segment];
            }
        }
        return null;
    },

    getConnectedNodes: (nodeId) => {
        const {edgeIndex} = get();
        return edgeIndex.getConnectedNodeIds(nodeId);
    },

    find: (edgeId) => {
        const {edgeIndex} = get();
        const edge = edgeIndex.getEdge(edgeId);
        return edge || null;
    },

    draw: (ctx) => {
        const {edges} = get();
        const nodeStore = useNodeStore.getState();

        ctx.lineWidth = 1.5;
        edges.forEach(edge => {
            const fromNode = nodeStore.find(edge.from);
            const toNode = nodeStore.find(edge.to);

            if (!fromNode || !toNode) return;

            const grad = ctx.createLinearGradient(fromNode.position.x, fromNode.position.y, toNode.position.x, toNode.position.y);
            grad.addColorStop(0, fromNode.type.color);
            grad.addColorStop(1, toNode.type.color);
            ctx.strokeStyle = grad;

            ctx.beginPath();
            ctx.moveTo(fromNode.position.x, fromNode.position.y);
            ctx.lineTo(toNode.position.x, toNode.position.y);
            ctx.stroke();
        });
    },
}));