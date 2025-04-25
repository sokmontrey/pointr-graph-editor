import {Vec2} from "../../utils/vector.ts";

export interface NodeType {
    name: string;
    color: string;
    isRedundantId: boolean;
}

export const nodeTypes: Record<string, NodeType> = {
    PathNode: {
        name: "Path Node",
        color: "blue",
        isRedundantId: false,
    },
    ReferenceNode: {
        name: "Reference Node",
        color: "orange",
        isRedundantId: true,
    },
    RoomNode: {
        name: "Room Node",
        color: "green",
        isRedundantId: false,
    }
}

export interface Node {
    id: string;
    type: NodeType;
    position: Vec2;
}