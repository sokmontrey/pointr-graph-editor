import {EdgeStore, NodeSeedStore, NodeStore} from "../stores/graph";
import {GridAction, GridState} from "../stores/gridStore.ts";
import {ViewportAction, ViewportState} from "../stores/viewportStore.ts";
import {ImageOverlayAction, ImageOverlayState} from "../stores/imageOverlayStore.ts";
import {ModeAction, ModeState} from "../stores/modeStore.ts";

export class GraphStores {
    static nodeStore: NodeStore;
    static edgeStore: EdgeStore;
    static nodeSeedStore: NodeSeedStore;
}

export class CanvasStores {
    static viewportStore: ViewportState & ViewportAction;
    static imageOverlayStore: ImageOverlayState & ImageOverlayAction;
    static gridStore: GridState & GridAction;
}

export class MainStores {
    static modeStore: ModeState & ModeAction;
}