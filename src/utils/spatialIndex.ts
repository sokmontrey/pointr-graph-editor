import {Vec2} from "./vector.ts";
import {GraphNode} from "../domain/graph";

class SpatialIndex {
    private cells: Map<string, Set<string>> = new Map();
    private cellSize: number = 50; // Size of each cell in the grid

    constructor(cellSize: number = 50) {
        this.cellSize = cellSize;
    }

    private getCellKey(position: Vec2): string {
        const cellX = Math.floor(position.x / this.cellSize);
        const cellY = Math.floor(position.y / this.cellSize);
        return `${cellX},${cellY}`;
    }

    private getNearbyCellKeys(position: Vec2, radius: number): string[] {
        const cellKeys: string[] = [];
        const radiusCells = Math.ceil(radius / this.cellSize);

        const centerCellX = Math.floor(position.x / this.cellSize);
        const centerCellY = Math.floor(position.y / this.cellSize);

        for (let dx = -radiusCells; dx <= radiusCells; dx++) {
            for (let dy = -radiusCells; dy <= radiusCells; dy++) {
                cellKeys.push(`${centerCellX + dx},${centerCellY + dy}`);
            }
        }

        return cellKeys;
    }

    add(nodeId: string, position: Vec2): void {
        const cellKey = this.getCellKey(position);
        if (!this.cells.has(cellKey)) {
            this.cells.set(cellKey, new Set());
        }
        this.cells.get(cellKey)!.add(nodeId);
    }

    remove(nodeId: string, position: Vec2): void {
        const cellKey = this.getCellKey(position);
        if (this.cells.has(cellKey)) {
            this.cells.get(cellKey)!.delete(nodeId);
        }
    }

    update(nodeId: string, oldPosition: Vec2, newPosition: Vec2): void {
        this.remove(nodeId, oldPosition);
        this.add(nodeId, newPosition);
    }

    getNearbyNodeIds(position: Vec2, radius: number): Set<string> {
        const cellKeys = this.getNearbyCellKeys(position, radius);
        const nodeIds = new Set<string>();

        for (const cellKey of cellKeys) {
            if (this.cells.has(cellKey)) {
                const cellNodeIds = this.cells.get(cellKey)!;
                for (const nodeId of cellNodeIds) {
                    nodeIds.add(nodeId);
                }
            }
        }

        return nodeIds;
    }

    clear(): void {
        this.cells.clear();
    }

    rebuild(nodes: GraphNode[]): void {
        this.clear();
        for (const node of nodes) {
            this.add(node.id, node.position);
        }
    }
}

export default SpatialIndex;