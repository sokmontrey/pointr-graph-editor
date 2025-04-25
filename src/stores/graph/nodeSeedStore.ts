import {create} from 'zustand';
import {nodeTypes} from "../../domain/graph";

export interface NodeSeedState {
    seed: Record<string, number>;
}

export interface NodeSeedAction {
    getId: (nodeType: string) => number;
    incrementSeed: (nodeType: string) => void;
    decrementSeed: (nodeType: string) => void;
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
    getId: (nodeType: string) => {
        const {seed} = get();
        return seed[nodeType] || 0;
    },
    incrementSeed: (nodeType: string) => {
        const {seed} = get();
        set({seed: {...seed, [nodeType]: seed[nodeType] + 1}});
    },
    decrementSeed: (nodeType: string) => {
        const {seed} = get();
        set({seed: {...seed, [nodeType]: seed[nodeType] - 1}});
    },
    loadSeed: (seed) => set({seed}),
}));
