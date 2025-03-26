import React from 'react';

interface CanvasProps {
    ref: React.RefObject<HTMLCanvasElement | null>
}

const Canvas = ({
    ref
}: CanvasProps) => {
    return ( <>
        <canvas
            ref={ref}
        ></canvas>
    </>);
}

export default Canvas;
