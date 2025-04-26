import {Vec2} from "../../utils/vector.ts";

export interface NodeType {
    key: string;
    name: string;
    color: string;
}

export const nodeTypes: Record<string, NodeType> = Object.fromEntries([
    {
        key: "PathNode",
        name: "Path Node",
        color: "blue",
    },
    {
        key: "ReferenceNode",
        name: "Reference Node",
        color: "orange",
    },
    {
        key: "RoomNode",
        name: "Room Node",
        color: "green",
    }
].map(x => [x.key, x]));

export interface Node {
    id: string;
    label: string;
    type: NodeType;
    position: Vec2;
}