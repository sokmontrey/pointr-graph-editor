export interface GraphEdge {
    id: string;
    from: string;
    to: string;
}

export interface SerializedGraphEdge {
    id: string;
    from: string;
    to: string;
}

export const serializeGraphEdge =
    (edge: GraphEdge): SerializedGraphEdge => ({ ...edge });

export const deserializeGraphEdge =
    (edge: SerializedGraphEdge): GraphEdge => ({ ...edge });