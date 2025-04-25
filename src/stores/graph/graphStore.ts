import {create} from 'zustand';
import {useNodeSeedStore} from "./nodeSeedStore.ts";
import {Edge, NodeType} from "../../domain/graph";
import {Vec2} from "../../utils/vector.ts";
import {Node} from "../../domain/graph";

export interface GraphState {
    nodes: Node[];
    edges: Edge[];
}

export interface GraphAction {
    // Node actions
    addNode: (position: Vec2, nodeType: NodeType) => void;
    removeNode: (id: string) => void;
    moveNode: (id: string, position: Vec2) => void;
    updateNodeId: (id: string, newId: string) => void;
    loadNodes: (nodes: Node[]) => void;
    clearNodes: () => void;
    
    // Edge actions
    addEdge: (fromId: string, toId: string) => void;
    removeEdge: (id: string) => void;
    removeEdgesConnectedToNode: (nodeId: string) => void;
    updateEdgeNodeId: (oldId: string, newId: string) => void;
    loadEdges: (edges: Edge[]) => void;
    clearEdges: () => void;
    
    // Combined actions
    clearGraph: () => void;
    loadGraph: (nodes: Node[], edges: Edge[]) => void;
}

export const useGraphStore = create<
    GraphState & GraphAction
>((set, get) => ({
    nodes: [],
    edges: [],
    
    // Node actions
    addNode: (position, nodeType) => {
        const {nodes} = get();
        const id = useNodeSeedStore.getState().nextSeed(nodeType.name);
        const newNode: Node = {
            id: id.toString(),
            type: nodeType,
            position,
        };
        set({nodes: [...nodes, newNode]});
    },
    removeNode: (id) => {
        const {nodes} = get();
        // Also remove connected edges
        get().removeEdgesConnectedToNode(id);
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
    updateNodeId: (id, newId) => {
        const {nodes} = get();
        // TODO: check if newId already exists only if the nodeType allows it
        set({
            nodes: nodes.map(node => node.id === id ? {...node, id: newId} : node),
        });
        
        // Update edge references
        get().updateEdgeNodeId(id, newId);
    },
    loadNodes: (nodes) => set({nodes}),
    clearNodes: () => set({nodes: []}),
    
    // Edge actions
    addEdge: (fromId, toId) => {
        const {edges, nodes} = get();
        if (edges.some(edge => edge.from === fromId && edge.to === toId)) {
            return; // Edge already exists
        }
        
        // Check if nodes exist
        const fromNodeExists = nodes.some(node => node.id === fromId);
        const toNodeExists = nodes.some(node => node.id === toId);
        
        if (!fromNodeExists || !toNodeExists) {
            console.warn(`Cannot create edge: node ${!fromNodeExists ? fromId : toId} does not exist`);
            return;
        }
        
        const newEdge: Edge = {
            id: `${fromId}-${toId}-${Date.now()}`,
            from: fromId,
            to: toId,
        };
        set({edges: [...edges, newEdge]});
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
    updateEdgeNodeId: (oldId, newId) => {
        const {edges} = get();
        set({
            edges: edges.map(edge => {
                if (edge.from === oldId) {
                    return {...edge, from: newId};
                }
                if (edge.to === oldId) {
                    return {...edge, to: newId};
                }
                return edge;
            }),
        });
    },
    loadEdges: (edges) => set({edges}),
    clearEdges: () => set({edges: []}),
    
    // Combined actions
    clearGraph: () => set({nodes: [], edges: []}),
    loadGraph: (nodes, edges) => set({nodes, edges}),
}));
