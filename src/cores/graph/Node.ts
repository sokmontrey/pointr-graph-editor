import { NodeType } from "../../types/Graph";

export const nodeTypes: Record<string, NodeType> = {
    PathNode: {
        name: "Path Node",
        type: "PathNode",
        color: "blue",
    },
    RoomNode: {
        name: "Room Node",
        type: "RoomNode",
        color: "blue",
    },
    ReferenceNode: {
        name: "Reference Node",
        type: "ReferenceNode",
        color: "orange",
    },
};
