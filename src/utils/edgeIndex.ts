import {GraphEdge} from "../domain/graph";

class EdgeIndex {
    private edgeMap: Map<string, GraphEdge> = new Map();
    private fromNodeMap: Map<string, Set<string>> = new Map(); // fromNodeId -> Set of edgeIds
    private toNodeMap: Map<string, Set<string>> = new Map();   // toNodeId -> Set of edgeIds
    private connectionMap: Map<string, string> = new Map(); // "fromId-toId" -> edgeId

    add(edge: GraphEdge): void {
        this.edgeMap.set(edge.id, edge);
        if (!this.fromNodeMap.has(edge.from)) {
            this.fromNodeMap.set(edge.from, new Set());
        }
        this.fromNodeMap.get(edge.from)!.add(edge.id);
        if (!this.toNodeMap.has(edge.to)) {
            this.toNodeMap.set(edge.to, new Set());
        }
        this.toNodeMap.get(edge.to)!.add(edge.id);
        this.connectionMap.set(`${edge.from}-${edge.to}`, edge.id);
    }

    remove(edgeId: string): void {
        const edge = this.edgeMap.get(edgeId);
        if (!edge) return;

        this.edgeMap.delete(edgeId);

        // Remove from fromNodeMap
        if (this.fromNodeMap.has(edge.from)) {
            this.fromNodeMap.get(edge.from)!.delete(edgeId);
            if (this.fromNodeMap.get(edge.from)!.size === 0) {
                this.fromNodeMap.delete(edge.from);
            }
        }

        // Remove from toNodeMap
        if (this.toNodeMap.has(edge.to)) {
            this.toNodeMap.get(edge.to)!.delete(edgeId);
            if (this.toNodeMap.get(edge.to)!.size === 0) {
                this.toNodeMap.delete(edge.to);
            }
        }

        // Remove from connectionMap
        this.connectionMap.delete(`${edge.from}-${edge.to}`);
    }

    getEdge(edgeId: string): GraphEdge | undefined {
        return this.edgeMap.get(edgeId);
    }

    hasConnection(fromId: string, toId: string): boolean {
        return this.connectionMap.has(`${fromId}-${toId}`);
    }

    getEdgesFromNode(nodeId: string): GraphEdge[] {
        const edgeIds = this.fromNodeMap.get(nodeId) || new Set();
        return Array.from(edgeIds).map(id => this.edgeMap.get(id)!).filter(Boolean);
    }

    getEdgesToNode(nodeId: string): GraphEdge[] {
        const edgeIds = this.toNodeMap.get(nodeId) || new Set();
        return Array.from(edgeIds).map(id => this.edgeMap.get(id)!).filter(Boolean);
    }

    getEdgesConnectedToNode(nodeId: string): GraphEdge[] {
        const fromEdges = this.getEdgesFromNode(nodeId);
        const toEdges = this.getEdgesToNode(nodeId);
        return [...fromEdges, ...toEdges];
    }

    getConnectedNodeIds(nodeId: string): string[] {
        const connectedNodes: Set<string> = new Set();

        // Add nodes connected via outgoing edges
        const fromEdges = this.getEdgesFromNode(nodeId);
        for (const edge of fromEdges) {
            connectedNodes.add(edge.to);
        }

        // Add nodes connected via incoming edges
        const toEdges = this.getEdgesToNode(nodeId);
        for (const edge of toEdges) {
            connectedNodes.add(edge.from);
        }

        return Array.from(connectedNodes);
    }

    getAllEdges(): GraphEdge[] {
        return Array.from(this.edgeMap.values());
    }

    clear(): void {
        this.edgeMap.clear();
        this.fromNodeMap.clear();
        this.toNodeMap.clear();
        this.connectionMap.clear();
    }

    rebuild(edges: GraphEdge[]): void {
        this.clear();
        for (const edge of edges) {
            this.add(edge);
        }
    }
}

export default EdgeIndex;