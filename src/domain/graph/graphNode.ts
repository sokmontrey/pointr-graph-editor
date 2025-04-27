import {Vec2} from "../../utils/vector.ts";

export type NodeTypeKey = "PathNode" | "ReferenceNode" | "RoomNode";

export interface NodeType {
    key: NodeTypeKey;
    name: string;
    color: string;
}

export const nodeTypes: Record<string, NodeType> = Object.fromEntries([
    {
        key: "PathNode" as NodeTypeKey,
        name: "Path Node",
        color: "blue",
    },
    {
        key: "ReferenceNode" as NodeTypeKey,
        name: "Reference Node",
        color: "orange",
    },
    {
        key: "RoomNode" as NodeTypeKey,
        name: "Room Node",
        color: "green",
    }
].map(x => [x.key as NodeTypeKey, x]));

export interface GraphNode {
    id: string;
    label: string;
    type: NodeType;
    position: Vec2;
}

export interface SerializedGraphNode {
    id: string;
    label: string;
    type: string;
    position: { x: number; y: number };
}

export const serializeGraphNode = (node: GraphNode): SerializedGraphNode => ({
    id: node.id,
    label: node.label,
    type: node.type.key,
    position: {x: node.position.x, y: node.position.y},
});

export const deserializeGraphNode = (node: SerializedGraphNode): GraphNode => ({
    id: node.id,
    label: node.label,
    type: nodeTypes[node.type],
    position: new Vec2(node.position.x, node.position.y),
});