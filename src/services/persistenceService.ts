import {useNodeStore, useEdgeStore, useNodeSeedStore} from '../stores/graph';
import {useGridStore, useImageOverlayStore} from '../stores/canvas';
import {Vec2} from '../utils/vector';

// Storage keys
const STORAGE_PREFIX = 'graph-editor';
const WORKSPACE_KEY = `${STORAGE_PREFIX}-current-workspace`;
const DEFAULT_WORKSPACE = 'workspace1';

// Helper to create workspace-specific keys
const getWorkspaceKey = (workspace: string, storeKey: string) =>
    `${STORAGE_PREFIX}-${workspace}-${storeKey}`;

// Store keys
const STORE_KEYS = {
    NODE: 'node-store',
    EDGE: 'edge-store',
    NODE_SEED: 'node-seed-store',
    GRID: 'grid-store',
    IMAGE_OVERLAY: 'image-overlay-store',
};

// Interface for serializable data
export interface PersistenceData {
    workspace: string;
    timestamp: number;
    stores: {
        nodeStore?: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            nodes: any[];
        };
        edgeStore?: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            edges: any[];
        };
        nodeSeedStore?: {
            seed: Record<string, number>;
        };
        gridStore?: {
            gap: number;
        };
        imageOverlayStore?: {
            imageOffset: { x: number; y: number };
            imageScale: number;
            imageOpacity: number;
            imageData?: string | null; // Base64 encoded image data
        };
    };
}

/**
 * Service for persisting store data to local storage
 */
export class PersistenceService {
    private currentWorkspace: string = DEFAULT_WORKSPACE;

    constructor() {
        // Load current workspace from storage or use default
        const savedWorkspace = localStorage.getItem(WORKSPACE_KEY);
        if (savedWorkspace) {
            this.currentWorkspace = savedWorkspace;
        } else {
            this.setCurrentWorkspace(DEFAULT_WORKSPACE);
        }
    }

    /**
     * Get the current workspace
     */
    getCurrentWorkspace(): string {
        return this.currentWorkspace;
    }

    /**
     * Set the current workspace
     */
    setCurrentWorkspace(workspace: string): void {
        this.currentWorkspace = workspace;
        localStorage.setItem(WORKSPACE_KEY, workspace);
    }

    /**
     * Save all store data to local storage
     */
    saveAllStores(): void {
        const nodeStore = useNodeStore.getState();
        const edgeStore = useEdgeStore.getState();
        const nodeSeedStore = useNodeSeedStore.getState();
        const gridStore = useGridStore.getState();
        const imageOverlayStore = useImageOverlayStore.getState();

        // Create serializable data
        const data: PersistenceData = {
            workspace: this.currentWorkspace,
            timestamp: Date.now(),
            stores: {
                nodeStore: {
                    nodes: nodeStore.nodes.map(node => ({
                        ...node,
                        position: {x: node.position.x, y: node.position.y}, // Convert Vec2 to plain object
                        type: { // Ensure the node type is properly serialized
                            key: node.type.key,
                            name: node.type.name,
                            color: node.type.color
                        }
                    }))
                },
                edgeStore: {
                    edges: edgeStore.edges
                },
                nodeSeedStore: {
                    seed: nodeSeedStore.seed
                },
                gridStore: {
                    gap: gridStore.gap
                },
                imageOverlayStore: {
                    imageOffset: {
                        x: imageOverlayStore.imageOffset.x,
                        y: imageOverlayStore.imageOffset.y
                    },
                    imageScale: imageOverlayStore.imageScale,
                    imageOpacity: imageOverlayStore.imageOpacity,
                    imageData: imageOverlayStore.imageData
                }
            }
        };

        // Save each store separately
        this.saveStore(STORE_KEYS.NODE, data.stores.nodeStore);
        this.saveStore(STORE_KEYS.EDGE, data.stores.edgeStore);
        this.saveStore(STORE_KEYS.NODE_SEED, data.stores.nodeSeedStore);
        this.saveStore(STORE_KEYS.GRID, data.stores.gridStore);
        this.saveStore(STORE_KEYS.IMAGE_OVERLAY, data.stores.imageOverlayStore);

        console.log(`Saved all stores to workspace: ${this.currentWorkspace}`);
    }

    /**
     * Load all store data from local storage
     * @param workspace Optional workspace to load from
     * @returns true if data was loaded, false if no data was found
     */
    loadAllStores(workspace?: string): boolean {
        const targetWorkspace = workspace || this.currentWorkspace;

        // Check if we have data for this workspace
        const nodeStoreData = this.loadStore(STORE_KEYS.NODE, targetWorkspace);
        if (!nodeStoreData) {
            console.log(`No data found for workspace: ${targetWorkspace}`);
            return false;
        }

        // If loading a different workspace, set it as current
        if (workspace && workspace !== this.currentWorkspace) {
            this.setCurrentWorkspace(workspace);
        }

        // Load each store
        this.loadNodeStore(targetWorkspace);
        this.loadEdgeStore(targetWorkspace);
        this.loadNodeSeedStore(targetWorkspace);
        this.loadGridStore(targetWorkspace);
        this.loadImageOverlayStore(targetWorkspace);

        console.log(`Loaded all stores from workspace: ${targetWorkspace}`);
        return true;
    }

    /**
     * Clear all store data for the current workspace
     */
    clearCurrentWorkspace(): void {
        const nodeStore = useNodeStore.getState();
        const edgeStore = useEdgeStore.getState();
        const nodeSeedStore = useNodeSeedStore.getState();
        const gridStore = useGridStore.getState();
        const imageOverlayStore = useImageOverlayStore.getState();

        // Clear each store
        nodeStore.clearNodes();
        edgeStore.clearEdges();

        // Reset node seed store with default empty values for all node types
        const defaultSeed = Object.fromEntries(
            Object.keys(nodeSeedStore.seed).map(key => [key, 0])
        );
        nodeSeedStore.loadSeed(defaultSeed);

        gridStore.setGap(10); // Reset to default
        imageOverlayStore.setImageOffset(new Vec2(0, 0));
        imageOverlayStore.setImageScale(1);
        imageOverlayStore.setImageOpacity(1);
        imageOverlayStore.setImage(null, null);

        console.log(`Cleared all stores for workspace: ${this.currentWorkspace}`);
    }

    /**
     * Debug method to log the current state of all stores
     */
    debugStores(): void {
        const nodeStore = useNodeStore.getState();
        const edgeStore = useEdgeStore.getState();
        const nodeSeedStore = useNodeSeedStore.getState();
        const gridStore = useGridStore.getState();
        const imageOverlayStore = useImageOverlayStore.getState();

        console.group('Current Store State');
        console.log('Workspace:', this.currentWorkspace);
        console.log('Nodes:', nodeStore.nodes);
        console.log('Edges:', edgeStore.edges);
        console.log('Node Seed:', nodeSeedStore.seed);
        console.log('Grid Gap:', gridStore.gap);
        console.log('Image Overlay:', {
            offset: imageOverlayStore.imageOffset,
            scale: imageOverlayStore.imageScale,
            opacity: imageOverlayStore.imageOpacity
        });
        console.groupEnd();
    }

    /**
     * Save a specific store to local storage
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private saveStore(storeKey: string, data: any): void {
        const key = getWorkspaceKey(this.currentWorkspace, storeKey);
        localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * Load a specific store from local storage
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private loadStore(storeKey: string, workspace: string = this.currentWorkspace): any {
        const key = getWorkspaceKey(workspace, storeKey);
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    /**
     * Load node store data
     */
    private loadNodeStore(workspace: string = this.currentWorkspace): void {
        const data = this.loadStore(STORE_KEYS.NODE, workspace);
        if (data && data.nodes) {
            const nodeStore = useNodeStore.getState();
            // Convert plain position objects to Vec2 and ensure node type is properly restored
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const nodes = data.nodes.map((node: any) => {
                // Make sure the node type is properly restored
                // If type is stored as an object with a key property, use that to look up the actual NodeType
                const nodeType = typeof node.type === 'object' && node.type.key
                    ? {...node.type} // Keep the saved type object
                    : node.type; // Fallback to whatever was saved

                return {
                    ...node,
                    position: new Vec2(node.position.x, node.position.y),
                    type: nodeType
                };
            });
            nodeStore.loadNodes(nodes);
        }
    }

    /**
     * Load edge store data
     */
    private loadEdgeStore(workspace: string = this.currentWorkspace): void {
        const data = this.loadStore(STORE_KEYS.EDGE, workspace);
        if (data && data.edges) {
            const edgeStore = useEdgeStore.getState();
            edgeStore.loadEdges(data.edges);
        }
    }

    /**
     * Load node seed store data
     */
    private loadNodeSeedStore(workspace: string = this.currentWorkspace): void {
        const data = this.loadStore(STORE_KEYS.NODE_SEED, workspace);
        if (data && data.seed) {
            const nodeSeedStore = useNodeSeedStore.getState();

            // Get the current seed to ensure we have all node types
            const currentSeed = nodeSeedStore.seed;

            // Merge the loaded seed with the current seed to ensure all node types are present
            const mergedSeed = {...currentSeed, ...data.seed};

            nodeSeedStore.loadSeed(mergedSeed);
        }
    }

    /**
     * Load grid store data
     */
    private loadGridStore(workspace: string = this.currentWorkspace): void {
        const data = this.loadStore(STORE_KEYS.GRID, workspace);
        if (data && data.gap !== undefined) {
            const gridStore = useGridStore.getState();
            gridStore.setGap(data.gap);
        }
    }

    /**
     * Load image overlay store data
     */
    private loadImageOverlayStore(workspace: string = this.currentWorkspace): void {
        const data = this.loadStore(STORE_KEYS.IMAGE_OVERLAY, workspace);
        if (data) {
            const imageOverlayStore = useImageOverlayStore.getState();

            if (data.imageOffset) {
                imageOverlayStore.setImageOffset(new Vec2(data.imageOffset.x, data.imageOffset.y));
            }

            if (data.imageScale !== undefined) {
                imageOverlayStore.setImageScale(data.imageScale);
            }

            if (data.imageOpacity !== undefined) {
                imageOverlayStore.setImageOpacity(data.imageOpacity);
            }

            // Load image data if available
            if (data.imageData) {
                // Create a new image from the stored data
                const image = new Image();
                image.src = data.imageData;

                // Set the image once it's loaded
                image.onload = () => {
                    imageOverlayStore.setImage(image, data.imageData);
                };
            } else {
                // Clear the image if no data is available
                imageOverlayStore.setImage(null, null);
            }
        }
    }

    /**
     * Get all available workspaces from localStorage
     */
    getAllWorkspaces(): string[] {
        const workspaces = new Set<string>();
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key || key === WORKSPACE_KEY) continue;
            if (!key.startsWith(`${STORAGE_PREFIX}-`)) continue;
            // key format: graph-editor-<workspace>-<storeKey>
            const parts = key.split('-');
            if (parts.length < 3) continue;
            const workspace = parts[2];
            workspaces.add(workspace);
        }
        return Array.from(workspaces);
    }
}

// Create a singleton instance
export const persistenceService = new PersistenceService();
