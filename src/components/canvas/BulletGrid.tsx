import {useViewportStore} from "../../stores/viewportStore.ts";
import {ZIndexProps} from "./Canvas.tsx";

const BulletGrid = ({ zIndex }: ZIndexProps) => {
    const viewport = useViewportStore();
    const baseGridSize = 10; // TODO: grid store & control
    const gridSize = Math.max(1, baseGridSize * viewport.scale);

    return <div
        className="absolute -z-10 inset-0 h-full w-full"
        style={{
            backgroundImage: 'radial-gradient(circle, #73737388 1px, transparent 1px)',
            backgroundSize: `${gridSize}px ${gridSize}px`,
            backgroundPosition: `${viewport.offset.x % gridSize}px ${viewport.offset.y % gridSize}px`,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex,
        }}
    />
};

export default BulletGrid;