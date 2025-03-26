import { useRef } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import { useCanvasInteraction } from './hooks/useCanvasInteraction';
import { useModeManager } from './hooks/useModeManager';

export default function App () {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { mode, switchMode } = useModeManager();
    useCanvasInteraction(canvasRef, mode);

    return ( <>
        <Canvas ref={canvasRef}></Canvas>
    </> );
}