interface CanvasProps {
    mainRef: React.Ref<HTMLCanvasElement>;
    overlayRef: React.Ref<HTMLCanvasElement>;
    width?: number;
    height?: number;
}

const Canvas = ({
    mainRef,
    overlayRef,
    width = 800,
    height = 600,
}: CanvasProps) => {
    return (
        <div style={{ position: 'relative' }}>
            <canvas
                ref={mainRef}
                width={width}
                height={height}
                style={{ 
                    border: '1px solid #ccc',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }} 
            />
            <canvas
                ref={overlayRef}
                width={width}
                height={height}
                style={{ 
                    border: '1px solid #ccc',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none'
                }} 
            />
        </div>
    );
};

export default Canvas;
