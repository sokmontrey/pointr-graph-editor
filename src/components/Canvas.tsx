interface CanvasProps {
    ref: React.Ref<HTMLCanvasElement>;
    width?: number;
    height?: number;
}

const Canvas = ({ 
    ref,
    width = 800, 
    height = 600,
}: CanvasProps) => {
    return (
        <canvas 
        ref={ref}
        width={width}
        height={height}
        style={{ border: '1px solid #ccc' }}/>
    );
};

export default Canvas;
