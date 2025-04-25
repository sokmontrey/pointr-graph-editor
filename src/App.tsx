import './App.css';
import MainCanvas from "./components/canvas/MainCanvas.tsx";
import ModeControl from "./components/controls/modeControl.tsx";
import ImageOverlayControl from "./components/controls/ImageOverlayControl.tsx";
import ImageOverlayCanvas from "./components/canvas/ImageOverlayCanvas.tsx";
import BulletGrid from "./components/canvas/BulletGrid.tsx";
import GridControl from "./components/controls/gridControl.tsx";
import ModeOverlayCanvas from "./components/canvas/ModeOverlayCanvas.tsx";
import {useEdgeStore, useNodeSeedStore, useNodeStore} from "./stores/graph";
import {CanvasStores, GraphStores, MainStores} from "./core/SingletonStores.ts";
import {useGridStore} from "./stores/gridStore.ts";
import {useImageOverlayStore} from "./stores/imageOverlayStore.ts";
import {useViewportStore} from "./stores/viewportStore.ts";
import {useModeStore} from "./stores/modeStore.ts";

export default function App() {
    GraphStores.nodeSeedStore = useNodeSeedStore();
    GraphStores.nodeStore = useNodeStore();
    GraphStores.edgeStore = useEdgeStore();

    CanvasStores.gridStore = useGridStore();
    CanvasStores.imageOverlayStore = useImageOverlayStore();
    CanvasStores.viewportStore = useViewportStore();

    MainStores.modeStore = useModeStore();

    return (<>
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
        }}>
            <ModeControl/>
            <ImageOverlayControl/>
            <GridControl/>
        </div>

        <div style={{position: 'relative'}}>
            <ModeOverlayCanvas zIndex={1000}/>
            <MainCanvas zIndex={100}/>
            <BulletGrid zIndex={10}/>
            <ImageOverlayCanvas zIndex={0}/>
        </div>
    </>);
}
