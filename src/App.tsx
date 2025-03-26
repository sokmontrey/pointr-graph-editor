import { useRef, useState } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import { useCanvasInteraction } from './hooks/useCanvasInteraction';
import { Mode } from './types/Mode';
import SelectMode from './cores/modes/SelectMode';

export default function App () {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ mode, setMode ] = useState<Mode>(new SelectMode());
    useCanvasInteraction(canvasRef, mode);

    return ( <>
        <Canvas ref={canvasRef}></Canvas>
    </> );
}