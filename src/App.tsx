import './App.css';
import MainCanvas from "./components/canvas/MainCanvas.tsx";
import ModeControl from "./components/controls/modeControl.tsx";
import ImageOverlayControl from "./components/controls/ImageOverlayControl.tsx";
import OverlayCanvas from "./components/canvas/OverlayCanvas.tsx";

export default function App() {
    return ( <>
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1000,
        }}>
            <ModeControl />
            <ImageOverlayControl />
        </div>

        <div style={{position: 'relative'}}>
            <MainCanvas />
            <OverlayCanvas />
        </div>
    </>);
}
