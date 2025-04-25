import {useViewportStore} from "../../stores/viewportStore.ts";
import {ZIndexProps} from "./Canvas.tsx";
import {useGridStore} from "../../stores/gridStore.ts";

const BulletGrid = ({ zIndex }: ZIndexProps) => {
    const viewport = useViewportStore();
    const grid = useGridStore();
    const gapSize = Math.max(1, grid.gap * viewport.scale);
    const dotSize = 0.8 + Math.max(0.2, viewport.scale * 0.2);

    return <div
        className="absolute -z-10 inset-0 h-full w-full"
        style={{
            backgroundImage: `radial-gradient(circle, #73737399 ${dotSize}px, transparent ${dotSize}px)`,
            backgroundSize: `${gapSize}px ${gapSize}px`,
            backgroundPosition: `${viewport.offset.x % gapSize}px ${viewport.offset.y % gapSize}px`,
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