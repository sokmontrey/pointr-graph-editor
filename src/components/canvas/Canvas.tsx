import React from "react";

interface CanvasProps {
    ref: React.Ref<HTMLCanvasElement>;
    width?: number;
    height?: number;
    disablePointerEvent?: boolean;
}

const Canvas = ({
                    ref,
                    disablePointerEvent = false,
                }: CanvasProps) => {
    return (<canvas
        ref={ref}
        style={{
            border: '1px solid #ccc',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            pointerEvents: disablePointerEvent ? undefined : 'none'
        }}
    />)
};

export default Canvas;
