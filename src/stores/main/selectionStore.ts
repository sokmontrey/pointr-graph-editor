import {create} from 'zustand';

export interface SelectionState {
    selectedNode: string | null;
    selectedEdge: string | null;
}

export interface SelectionAction {
    setSelectedNode: (nodeId: string | null) => void;
    setSelectedEdge: (edgeId: string | null) => void;
    clear: () => void;
}

export type SelectionStore = SelectionState & SelectionAction;

export const useSelectionStore = create<SelectionStore>((set) => ({
    selectedNode: null,
    selectedEdge: null,
    setSelectedNode: (nodeId) => set({selectedNode: nodeId}),
    setSelectedEdge: (edgeId) => set({selectedEdge: edgeId}),
    clear: () => set({selectedNode: null, selectedEdge: null}),
}));
