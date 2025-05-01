import {create} from 'zustand';
import {GraphEdge, GraphNode} from "../../domain/graph";
import {useEdgeStore, useNodeStore} from "../graph";
import {useCommandStore} from "./commandStore.ts";
import DeleteNodeCommand from "../../core/commands/DeleteNodeCommand.ts";
import DeleteEdgeCommand from "../../core/commands/DeleteEdgeCommand.ts";

export interface SelectionState {
    entity: GraphNode | GraphEdge | null;
    type: "node" | "edge" | null;
}

export interface SelectionAction {
    setNode: (nodeId: string | null) => void;
    setEdge: (edgeId: string | null) => void;
    delete: () => void;
    clear: () => void;
}

export type SelectionStore = SelectionState & SelectionAction;

export const useSelectionStore = create<SelectionStore>((set, get) => ({
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
    delete: () => {
        const {entity, type} = get();
        if (!entity || !type) {
            return;
        }

        const command = type === "node"
            ? new DeleteNodeCommand(entity.id)
            : new DeleteEdgeCommand(entity.id);
        useCommandStore.getState().execute(command);
    },
    clear: () => set({entity: null, type: null}),
}));
