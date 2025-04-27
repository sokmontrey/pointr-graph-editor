import {create} from 'zustand';
import {GraphEdge, GraphNode} from "../../domain/graph";
import {useEdgeStore, useNodeStore} from "../graph";

export interface SelectionState {
    entity: GraphNode | GraphEdge | null;
    type: "node" | "edge" | null;
}

export interface SelectionAction {
    setNode: (nodeId: string | null) => void;
    setEdge: (edgeId: string | null) => void;
    clear: () => void;
}

export type SelectionStore = SelectionState & SelectionAction;

export const useSelectionStore = create<SelectionStore>((set) => ({
    entity: null,
    type: null,
    setNode: (nodeId) => {
        const nodeStore = useNodeStore.getState();
        const node = nodeStore.nodes.find(node => node.id === nodeId) ?? null;
        set({entity: node, type: "node"});
    },
    setEdge: (edgeId) => {
        const edgeStore = useEdgeStore.getState();
        const edge = edgeStore.edges.find(edge => edge.id === edgeId) ?? null;
        set({entity: edge, type: "edge"});
    },
    clear: () => set({entity: null, type: null}),
}));
