import React from "react";

interface CanvasProps {
    ref: React.Ref<HTMLCanvasElement>;
    width?: number;
    height?: number;
    zIndex?: number;
    disablePointerEvent?: boolean;
}

const Canvas = ({
                    ref,
                    zIndex = 0,
                    disablePointerEvent = true,
                }: CanvasProps) => {
    return (<canvas
        ref={ref}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
            border: '1px solid #ccc',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex,
            pointerEvents: disablePointerEvent ? 'none' : undefined,
        }}
    />)
};

export default Canvas;
