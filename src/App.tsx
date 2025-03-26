import { useRef, useState } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import { useCanvasInteraction } from './hooks/useCanvasInteraction';
import { useViewport } from './hooks/useViewport';
import { Mode } from './types/Mode';
import SelectMode from './cores/modes/SelectMode';

export default function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { 
        viewport, 
        pan, 
        zoom 
    } = useViewport(1);
    const [ mode, setMode ] = useState<Mode>(new SelectMode());

    // TODO: move panning and zooming to its own Mode
    //      Enable panning/zooming when ctrl is pressed and disable when ctrl is released
    //      Create another hook for keyboard shortcuts (+ hold vs press shortcuts)
    //      Having a modeManager might help
    useCanvasInteraction(canvasRef, mode, viewport, pan, zoom); 
    
    return ( <div className="canvas-container">
        <Canvas ref={canvasRef} viewport={viewport} />
    </div>);
}
