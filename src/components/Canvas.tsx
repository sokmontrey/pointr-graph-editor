import React, { useEffect, useRef } from 'react';
import { Viewport } from '../types/Viewport';

interface CanvasProps {
    viewport: Viewport;
    width?: number;
    height?: number;
    ref?: React.RefObject<HTMLCanvasElement | null>;
}

const Canvas = ({ 
    viewport, 
    ref,
    width = 800, 
    height = 600,
}: CanvasProps) => {
    // TODO: deal with viewport later
    useEffect(() => {
        const canvas = ref?.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Apply viewport transformation
        ctx.save();
        ctx.translate(viewport.x, viewport.y);
        ctx.scale(viewport.scale, viewport.scale);
        
        // Draw your content here
        // ...
        
        ctx.restore();
    }, [viewport, ref]);
    
    return (
        <canvas
            ref={ref}
            width={width}
            height={height}
            style={{ border: '1px solid #ccc' }}
        />
    );
}

export default Canvas;
