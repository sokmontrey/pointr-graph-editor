import {create} from 'zustand';
import {nodeTypes} from "../../domain/graph";

export interface NodeSeedState {
    seed: Record<string, number>;
}

export interface NodeSeedAction {
    nextSeed: (nodeType: string) => number;
    loadSeed: (seed: Record<string, number>) => void;
}

const defaultNodeSeedSettings: NodeSeedState = {
    seed: Object.fromEntries(
        Object.keys(nodeTypes).map(key => [key, 0])
    ),
};

export const useNodeSeedStore = create<
    NodeSeedState & NodeSeedAction
>((set, get) => ({
    ...defaultNodeSeedSettings,
    nextSeed: (nodeType: string) => {
        const {seed} = get();
        const nextId = seed[nodeType] || 0;
        set({seed: {...seed, [nodeType]: nextId + 1}});
        return nextId;
    },
    loadSeed: (seed) => set({seed}),
}));
