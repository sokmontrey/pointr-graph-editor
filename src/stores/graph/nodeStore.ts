import {create} from 'zustand';
import {GraphNode, NodeType} from "../../domain/graph";
import {Vec2} from "../../utils/vector.ts";
import SpatialIndex from "../../utils/spatialIndex.ts";

export interface NodeState {
    nodes: GraphNode[];
    nodeMap: Map<string, GraphNode>;
    spatialIndex: SpatialIndex;
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
    nodeMap: new Map(),
    spatialIndex: new SpatialIndex(),

    addNode: (label, position, nodeType, id = null) => {
        const {nodes, nodeMap, spatialIndex} = get();
        id ??= Date.now().toString();
        const newNode: GraphNode = {
            id,
            label,
            type: nodeType,
            position,
        };

        const updatedNodes = [...nodes, newNode];
        const updatedNodeMap = new Map(nodeMap);
        updatedNodeMap.set(id, newNode);

        spatialIndex.add(id, position);

        set({
            nodes: updatedNodes,
            nodeMap: updatedNodeMap
        });
        return id;
    },

    removeNode: (id) => {
        const {nodes, nodeMap, spatialIndex} = get();
        const node = nodeMap.get(id);

        if (node) {
            spatialIndex.remove(id, node.position);

            const updatedNodeMap = new Map(nodeMap);
            updatedNodeMap.delete(id);

            set({
                nodes: nodes.filter(node => node.id !== id),
                nodeMap: updatedNodeMap
            });
        }
    },

    moveNode: (id, position) => {
        const {nodes, nodeMap, spatialIndex} = get();
        const node = nodeMap.get(id);

        if (node) {
            spatialIndex.update(id, node.position, position);
            const updatedNode = {...node, position};
            const updatedNodeMap = new Map(nodeMap);
            updatedNodeMap.set(id, updatedNode);

            set({
                nodes: nodes.map(n => n.id === id ? updatedNode : n),
                nodeMap: updatedNodeMap
            });
        }
    },

    updateNodeLabel: (id, newLabel) => {
        const {nodes, nodeMap} = get();
        const node = nodeMap.get(id);
        if (node) {
            const updatedNode = {...node, label: newLabel};
            const updatedNodeMap = new Map(nodeMap);
            updatedNodeMap.set(id, updatedNode);
            set({
                nodes: nodes.map(n => n.id === id ? updatedNode : n),
                nodeMap: updatedNodeMap
            });
        }
    },

    loadNodes: (nodes) => {
        const nodeMap = new Map();
        for (const node of nodes) {
            nodeMap.set(node.id, node);
        }
        const spatialIndex = new SpatialIndex();
        spatialIndex.rebuild(nodes);
        set({nodes, nodeMap, spatialIndex});
    },

    clearNodes: () => {
        const {spatialIndex} = get();
        spatialIndex.clear();
        set({nodes: [], nodeMap: new Map()});
    },

    getHoveredNode: (position) => {
        const {nodeMap, spatialIndex} = get();
        const radius = 10;
        const nearbyNodeIds = spatialIndex.getNearbyNodeIds(position, radius);
        for (const nodeId of nearbyNodeIds) {
            const node = nodeMap.get(nodeId);
            if (node && node.position.distance(position) < radius) {
                return node;
            }
        }
        return null;
    },

    find: (id) => {
        const {nodeMap} = get();
        return nodeMap.get(id) || null;
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