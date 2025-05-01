import './App.css';
import MainCanvas from "./components/canvas/MainCanvas.tsx";
import ModeControl from "./components/controls/ModeControl.tsx";
import ImageOverlayControl from "./components/controls/ImageOverlayControl.tsx";
import ImageOverlayCanvas from "./components/canvas/ImageOverlayCanvas.tsx";
import BulletGrid from "./components/canvas/BulletGrid.tsx";
// import GridControl from "./components/controls/gridControl.tsx";
import ModeOverlayCanvas from "./components/canvas/ModeOverlayCanvas.tsx";
import CommandControl from "./components/controls/CommandControl.tsx";
import GraphControl from "./components/controls/GraphControl.tsx";
import WorkspaceControl from "./components/controls/WorkspaceControl.tsx";
import {Neo4jControl} from "./components/controls/Neo4jControl.tsx";
import ReferenceNodeControl from "./components/controls/ReferenceNodeControl.tsx";

export default function App() {
    return (<>
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
        }}>
            <WorkspaceControl/>
            <ModeControl/>
            <ImageOverlayControl/>
            {/*<GridControl/> Mode doesn't reflect store changes, disable for now */}
            <CommandControl/>
            <GraphControl/>
            <Neo4jControl/>
            <ReferenceNodeControl/>
        </div>

        <div style={{position: 'relative'}}>
            <ModeOverlayCanvas zIndex={1000}/>
            <MainCanvas zIndex={100}/>
            <BulletGrid zIndex={10}/>
            <ImageOverlayCanvas zIndex={0}/>
        </div>
    </>);
}
