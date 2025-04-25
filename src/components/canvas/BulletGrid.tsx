import {useViewportStore} from "../../stores/viewportStore.ts";
import {ZIndexProps} from "./Canvas.tsx";

const BulletGrid = ({ zIndex }: ZIndexProps) => {
    const viewport = useViewportStore();
    const baseGapSize = 10; // TODO: grid store & control
    const gapSize = Math.max(1, baseGapSize * viewport.scale);
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