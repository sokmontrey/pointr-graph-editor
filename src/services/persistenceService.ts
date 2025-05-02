import {useNodeStore, useEdgeStore, useNodeSeedStore} from '../stores/graph';
import {defaultGridSettings, defaultImageOverlaySettings, useGridStore, useImageOverlayStore} from '../stores/canvas';
import {Vec2} from '../utils/vector';
import {deserializeGraphEdge, deserializeGraphNode, serializeGraphEdge, serializeGraphNode} from "../domain/graph";

const STORAGE_PREFIX = 'graph-editor';
const WORKSPACE_KEY = `${STORAGE_PREFIX}-current-workspace`;
const DEFAULT_WORKSPACE = 'workspace1';

const getWorkspaceKey = (workspace: string, storeKey: string) =>
    `${STORAGE_PREFIX}-${workspace}-${storeKey}`;

const STORE_KEYS = {
    NODE: 'node-store',
    EDGE: 'edge-store',
    NODE_SEED: 'node-seed-store',
    GRID: 'grid-store',
    IMAGE_OVERLAY: 'image-overlay-store',
};

export class PersistenceService {
    getCurrentWorkspace(): string {
        return localStorage.getItem(WORKSPACE_KEY) || DEFAULT_WORKSPACE;
    }

    setCurrentWorkspace(workspace: string): void {
        localStorage.setItem(WORKSPACE_KEY, workspace);
    }

    saveAllStores(workspace?: string): void {
        workspace ??= this.getCurrentWorkspace();

        this.saveNodeStore(workspace);
        this.saveEdgeStore(workspace);
        this.saveNodeSeedStore(workspace);
        this.saveGridStore(workspace);
        this.saveImageOverlayStore(workspace);

        console.info("Saved all stores for workspace: " + workspace);
    }

    saveNodeStore(workspace?: string): void {
        workspace ??= this.getCurrentWorkspace();
        const nodeStore = useNodeStore.getState();
        const serialized = {
            nodes: nodeStore.nodes.map(serializeGraphNode)
        };
        this.saveStore(workspace, STORE_KEYS.NODE, serialized);
    }

    saveEdgeStore(workspace?: string): void {
        workspace ??= this.getCurrentWorkspace();
        const edgeStore = useEdgeStore.getState();
        const serialized = {
            edges: edgeStore.edges.map(serializeGraphEdge)
        };
        this.saveStore(workspace, STORE_KEYS.EDGE, serialized);
    }

    saveNodeSeedStore(workspace?: string): void {
        workspace ??= this.getCurrentWorkspace();
        const nodeSeedStore = useNodeSeedStore.getState();
        const serialized = {
            seed: nodeSeedStore.seed
        };
        this.saveStore(workspace, STORE_KEYS.NODE_SEED, serialized);
    }

    saveGridStore(workspace?: string): void {
        workspace ??= this.getCurrentWorkspace();
        const gridStore = useGridStore.getState();
        const serialized = {
            gap: gridStore.gap
        };
        this.saveStore(workspace, STORE_KEYS.GRID, serialized);
    }

    saveImageOverlayStore(workspace?: string): void {
        workspace ??= this.getCurrentWorkspace();
        const imageOverlayStore = useImageOverlayStore.getState();
        const serialized = {
            imageOffset: {
                x: imageOverlayStore.imageOffset.x,
                y: imageOverlayStore.imageOffset.y
            },
            imageScale: imageOverlayStore.imageScale,
            imageOpacity: imageOverlayStore.imageOpacity,
            imageData: imageOverlayStore.imageData
        };
        this.saveStore(workspace, STORE_KEYS.IMAGE_OVERLAY, serialized);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private saveStore(workspace: string, storeKey: string, data: any): void {
        const key = getWorkspaceKey(workspace, storeKey);
        localStorage.setItem(key, JSON.stringify(data));
    }

    loadAllStores(workspace?: string): boolean {
        workspace ??= this.getCurrentWorkspace();

        if (!this.isWorkspaceExist(workspace)) {
            return false;
        }

        this.loadNodeStore(workspace);
        this.loadEdgeStore(workspace);
        this.loadNodeSeedStore(workspace);
        this.loadGridStore(workspace);
        this.loadImageOverlayStore(workspace);
        return true;
    }

    clearCurrentWorkspace(): void {
        const nodeStore = useNodeStore.getState();
        const edgeStore = useEdgeStore.getState();
        const nodeSeedStore = useNodeSeedStore.getState();
        const gridStore = useGridStore.getState();
        const imageOverlayStore = useImageOverlayStore.getState();

        nodeStore.clearNodes();
        edgeStore.clearEdges();

        const defaultSeed = Object.fromEntries(
            Object.keys(nodeSeedStore.seed).map(key => [key, 0])
        );
        nodeSeedStore.loadSeed(defaultSeed);

        gridStore.setGap(defaultGridSettings.gap);
        imageOverlayStore.setImageOffset(new Vec2(0, 0));
        imageOverlayStore.setImageScale(defaultImageOverlaySettings.imageScale);
        imageOverlayStore.setImageOpacity(defaultImageOverlaySettings.imageOpacity);
        imageOverlayStore.setImage(
            defaultImageOverlaySettings.image,
            defaultImageOverlaySettings.imageData);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private loadStore(storeKey: string, workspace: string = DEFAULT_WORKSPACE): any {
        const key = getWorkspaceKey(workspace, storeKey);
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    private loadNodeStore(workspace: string): void {
        const data = this.loadStore(STORE_KEYS.NODE, workspace);
        if (data && data.nodes) {
            const nodeStore = useNodeStore.getState();
            nodeStore.loadNodes(data.nodes.map(deserializeGraphNode));
        }
    }

    private loadEdgeStore(workspace: string): void {
        const data = this.loadStore(STORE_KEYS.EDGE, workspace);
        if (data && data.edges) {
            const edgeStore = useEdgeStore.getState();
            edgeStore.loadEdges(data.edges.map(deserializeGraphEdge));
        }
    }

    private loadNodeSeedStore(workspace: string): void {
        const data = this.loadStore(STORE_KEYS.NODE_SEED, workspace);
        if (data && data.seed) {
            const nodeSeedStore = useNodeSeedStore.getState();
            const currentSeed = nodeSeedStore.seed;
            const mergedSeed = {...currentSeed, ...data.seed};
            nodeSeedStore.loadSeed(mergedSeed);
        }
    }

    private loadGridStore(workspace: string): void {
        const data = this.loadStore(STORE_KEYS.GRID, workspace);
        if (data && data.gap !== undefined) {
            const gridStore = useGridStore.getState();
            gridStore.setGap(data.gap);
        }
    }

    private loadImageOverlayStore(workspace: string): void {
        const data = this.loadStore(STORE_KEYS.IMAGE_OVERLAY, workspace);
        if (data && data.imageOffset) {
            const imageOverlayStore = useImageOverlayStore.getState();
            imageOverlayStore.setImageOffset(new Vec2(data.imageOffset.x, data.imageOffset.y));
            imageOverlayStore.setImageScale(data.imageScale || defaultImageOverlaySettings.imageScale);
            imageOverlayStore.setImageOpacity(data.imageOpacity || defaultImageOverlaySettings.imageOpacity);
            if (data.imageData) {
                const image = new Image();
                image.src = data.imageData;
                image.onload = () => {
                    imageOverlayStore.setImage(image, data.imageData);
                };
            } else {
                imageOverlayStore.setImage(null, null);
            }
        }
    }

    getAllWorkspaces(): string[] {
        const workspaces = new Set<string>();
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key || key === WORKSPACE_KEY) continue;
            if (!key.startsWith(`${STORAGE_PREFIX}-`)) continue;
            const parts = key.split('-');
            if (parts.length < 3) continue;
            const workspace = parts[2];
            workspaces.add(workspace);
        }
        return Array.from(workspaces);
    }

    isWorkspaceExist(workspace: string): boolean {
        return this.loadStore(STORE_KEYS.NODE, workspace);
    }

    deleteWorkspace(workspace: string): void {
        for (const storeKey of Object.values(STORE_KEYS)) {
            const key = getWorkspaceKey(workspace, storeKey);
            localStorage.removeItem(key);
        }
    }
}

// Create a singleton instance
export const persistenceService = new PersistenceService();
