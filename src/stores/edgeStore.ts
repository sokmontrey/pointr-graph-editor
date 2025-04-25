import {create} from 'zustand';
import {Edge} from "../domain/graph";
import {useNodeStore} from "./nodeStore.ts";

export interface EdgeState {
    edges: Edge[];
}

export interface EdgeAction {
    addEdge: (fromId: string, toId: string) => void;
    removeEdge: (id: string) => void;
    removeEdgesConnectedToNode: (nodeId: string) => void;
    updateEdgeNodeId: (oldId: string, newId: string) => void;
    loadEdges: (edges: Edge[]) => void;
    clearEdges: () => void;
}

export const useEdgeStore = create<
    EdgeState & EdgeAction
>((set, get) => ({
    edges: [],
    addEdge: (fromId, toId) => {
        const {edges} = get();
        if (edges.some(edge => edge.from === fromId && edge.to === toId)) {
            return; // Edge already exists
        }
        
        // TODO: Check if nodes exist
        const nodeStore = useNodeStore.getState();
        const fromNodeExists = nodeStore.nodes.some(node => node.id === fromId);
        const toNodeExists = nodeStore.nodes.some(node => node.id === toId);
        
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
}));
