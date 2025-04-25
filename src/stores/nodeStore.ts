import {create} from 'zustand';
import {Node, NodeType} from "../domain/graph";
import {Vec2} from "../utils/vector.ts";
import {useNodeSeedStore} from "./nodeSeedStore.ts";

export interface NodeState {
    nodes: Node[];
}

export interface NodeAction {
    addNode: (position: Vec2, nodeType: NodeType) => void;
    removeNode: (id: string) => void;
    moveNode: (id: string, position: Vec2) => void;
    updateNodeId: (id: string, newId: string) => void;
    loadNodes: (nodes: Node[]) => void;
    clearNodes: () => void;
}

export const useNodeStore = create<
    NodeState & NodeAction
>((set, get) => ({
    nodes: [],
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
        // TODO: check if newId already exists
        set({
            nodes: nodes.map(node => node.id === id ? {...node, id: newId} : node),
        });
    },
    loadNodes: (nodes) => set({nodes}),
    clearNodes: () => set({nodes: []}),
}));
