import { useCallback, useRef } from 'react';
import { RenderBus, RenderFunction } from '../../types';

export const useRenderBus = (): RenderBus => {
    const renderFunctionsRef = useRef<Set<RenderFunction>>(new Set());

    const subscribe = useCallback((renderFn: RenderFunction): (() => void) => {
        renderFunctionsRef.current.add(renderFn);
        
        return () => {
            renderFunctionsRef.current.delete(renderFn);
        };
    }, []);

    const publish = useCallback((ctx: CanvasRenderingContext2D): void => {
        renderFunctionsRef.current.forEach(renderFn => renderFn(ctx));
    }, []);

    return { subscribe, publish };
};