import {create} from 'zustand';
import {nodeTypes} from "../../domain/graph";

export interface NodeSeedState {
    seed: Record<string, number>;
}

export interface NodeSeedAction {
    next: (nodeType: string) => number;
    loadSeed: (seed: Record<string, number>) => void;
}

const defaultNodeSeedSettings: NodeSeedState = {
    seed: Object.fromEntries(
        Object.keys(nodeTypes).map(key => [key, 0])
    ),
};

export type NodeSeedStore = NodeSeedState & NodeSeedAction;

export const useNodeSeedStore = create<NodeSeedStore>((set, get) => ({
    ...defaultNodeSeedSettings,
    next: (nodeType) => {
        const {seed} = get();
        const next = seed[nodeType] + 1;
        set({seed: {...seed, [nodeType]: next}});
        return next;
    },
    loadSeed: (seed) => set({seed}),
}));
