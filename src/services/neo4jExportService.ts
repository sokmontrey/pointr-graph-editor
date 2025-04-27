import {useEdgeStore, useNodeStore} from "../stores/graph";
import {GraphEdge, GraphNode} from "../domain/graph";
import {persistenceService} from "./persistenceService.ts";

class Neo4jExportService {
    export(filename: string = '') {
        filename = filename || persistenceService.getCurrentWorkspace();
        const fullFilename = filename.endsWith('.cypher') ? filename : filename + '.cypher';
        const cypher = this.generateCypher();
        const blob = new Blob([cypher], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fullFilename;
        a.click();
        URL.revokeObjectURL(url);
    }

    private generateCypher(): string {
        const nodes = useNodeStore.getState().nodes;
        const edges = useEdgeStore.getState().edges;

        const nodesStr = nodes
            .map(this.nodeToCypher)
            .filter(Boolean)
            .join('\n');
        const edgesStr = edges
            .map(this.edgeToCypher)
            .filter(Boolean)
            .join('\n');

        return nodesStr + '\n' + edgesStr;
    }

    private nodeToCypher(node: GraphNode): string {
        return `CREATE (n${node.label}:${node.type.key} {id: ${node.label}, raw_id: "${node.id}", x: ${node.position.x}, y: ${node.position.y}})`;
    }

    // Room node cannot point to any other node
    private edgeToCypher(edge: GraphEdge): string {
        const fromNode = useNodeStore.getState().nodes.find(node => node.id === edge.from)!;
        const toNode = useNodeStore.getState().nodes.find(node => node.id === edge.to)!;

        const isFromRoom = fromNode.type.key === "RoomNode";
        const isToRoom = toNode.type.key === "RoomNode";
        
        if (isFromRoom && isToRoom) {
            return '';
        }

        const distance = fromNode.position.distance(toNode.position);
        const toAngle = fromNode.position.subtract(toNode.position).angle();
        const fromAngle = toNode.position.subtract(fromNode.position).angle();
        
        if (isFromRoom) {
            return `CREATE (n${toNode.label})-[:CONNECTED_TO {distance: ${distance}, angle: ${toAngle}}]->(n${fromNode.label})`;
        }
        
        if (isToRoom) {
            return `CREATE (n${fromNode.label})-[:CONNECTED_TO {distance: ${distance}, angle: ${fromAngle}}]->(n${toNode.label})`;
        }
        
        return `CREATE (n${toNode.label})-[:CONNECTED_TO {distance: ${distance}, angle: ${toAngle}}]->(n${fromNode.label})` + '\n' +
            `CREATE (n${fromNode.label})-[:CONNECTED_TO {distance: ${distance}, angle: ${fromAngle}}]->(n${toNode.label})`;
    }
}

export const neo4jExportService = new Neo4jExportService();