import { useEffect } from 'react';
import { EventBus, Mode, ViewportManager } from '../../types';

export const useAttachViewportEvent = (
    eventBus: EventBus,
    viewport: ViewportManager,
) => {
    useEffect(() => {
        const unsubscribers = [
            eventBus.subscribe('wheel', viewport.handleZoom.bind(viewport)),
            eventBus.subscribe('dragging', viewport.handlePan.bind(viewport)),
        ];

        return () => {
            unsubscribers.forEach(f => f());
        };
    }, [eventBus, viewport]);
};

export const useAttachModeEvent = (
    eventBus: EventBus,
    mode: Mode,
) => {
    useEffect(() => {
        const unsubscribers = [
            eventBus.subscribe('mousemove', mode.handleMouseMove.bind(mode)),
            eventBus.subscribe('dragging', mode.handleDragging.bind(mode)),
            eventBus.subscribe('click', mode.handleClick.bind(mode)),
        ];

        return () => {
            unsubscribers.forEach(f => f());
        };
    }, [eventBus, mode]);
};