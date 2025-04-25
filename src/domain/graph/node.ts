import {Vec2} from "../../utils/vector.ts";

export interface NodeType {
    name: string;
    color: string;
}

export const nodeTypes: Record<string, NodeType> = {
    PathNode: {
        name: "Path Node",
        color: "blue"
    },
    ReferenceNode: {
        name: "Reference Node",
        color: "orange"
    },
    RoomNode: {
        name: "Room Node",
        color: "green"
    }
}

export interface Node {
    id: string;
    type: NodeType;
    position: Vec2;
}