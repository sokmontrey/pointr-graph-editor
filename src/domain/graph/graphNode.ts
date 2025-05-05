import {Vec2} from "../../utils/vector.ts";
import {IconSvgElement} from "@hugeicons/react";
import {
    CheckmarkCircle01Icon,
    CircleIcon, LinkCircleIcon
} from "@hugeicons/core-free-icons";

export type NodeTypeKey = "PathNode" | "ReferenceNode" | "RoomNode";

export interface NodeType {
    key: NodeTypeKey;
    name: string;
    color: string;
    icon: IconSvgElement;
}

export const nodeTypes: Record<string, NodeType> = Object.fromEntries([
    {
        key: "PathNode" as NodeTypeKey,
        name: "Normal Node",
        color: "#045cff",
        icon: CircleIcon,
    },
    {
        key: "ReferenceNode" as NodeTypeKey,
        name: "Reference Node",
        color: "#d83b3b",
        icon: LinkCircleIcon,
    },
    {
        key: "RoomNode" as NodeTypeKey,
        name: "Final Node",
        color: "#3aa23d",
        icon: CheckmarkCircle01Icon,
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