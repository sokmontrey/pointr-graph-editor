import {EdgeStore, NodeSeedStore, NodeStore} from "../stores/graph";
import {GridAction, GridState} from "../stores/canvas/gridStore.ts";
import {ViewportAction, ViewportState} from "../stores/canvas/viewportStore.ts";
import {ImageOverlayAction, ImageOverlayState} from "../stores/canvas/imageOverlayStore.ts";
import {ModeAction, ModeState} from "../stores/main/modeStore.ts";
import {CommandStore} from "../stores/main/commandStore.ts";

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
    static commandStore: CommandStore;
}