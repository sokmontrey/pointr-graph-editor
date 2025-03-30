export interface NodeType {
    name: string;
    type: string;
    color: string;
}

export interface Node {
    type: NodeType;
    x: number;
    y: number;
}

export interface Edge {
    from: Node;
    to: Node;
}

export interface Graph {
    nodes: Node[];
    edges: Edge[];
}
