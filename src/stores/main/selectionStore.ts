import {create} from 'zustand';

export interface SelectionState {
    selected: string | null;
    selectionType: 'node' | 'edge' | null;
}

export interface SelectionAction {
    setSelectedNode: (nodeId: string | null) => void;
    setSelectedEdge: (edgeId: string | null) => void;
    clear: () => void;
}

export type SelectionStore = SelectionState & SelectionAction;

export const useSelectionStore = create<SelectionStore>((set) => ({
    selected: null,
    selectionType: null,
    setSelectedNode: (nodeId) => set({selected: nodeId, selectionType: 'node'}),
    setSelectedEdge: (edgeId) => set({selected: edgeId, selectionType: 'edge'}),
    clear: () => set({selected: null, selectionType: null}),
}));
