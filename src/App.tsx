import './App.css';
import MainCanvas from "./components/canvas/MainCanvas.tsx";
import ModeControl from "./components/controls/modeControl.tsx";
import ImageOverlayControl from "./components/controls/ImageOverlayControl.tsx";
import ImageOverlayCanvas from "./components/canvas/ImageOverlayCanvas.tsx";
import BulletGrid from "./components/canvas/BulletGrid.tsx";
// import GridControl from "./components/controls/gridControl.tsx";
import ModeOverlayCanvas from "./components/canvas/ModeOverlayCanvas.tsx";
import CommandControl from "./components/controls/commandControl.tsx";

export default function App() {
    return (<>
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
        }}>
            <ModeControl/>
            <ImageOverlayControl/>
            {/*<GridControl/> Mode doesn't reflect store changes, disable for now */}
            <CommandControl/>
        </div>

        <div style={{position: 'relative'}}>
            <ModeOverlayCanvas zIndex={1000}/>
            <MainCanvas zIndex={100}/>
            <BulletGrid zIndex={10}/>
            <ImageOverlayCanvas zIndex={0}/>
        </div>
    </>);
}
