import { useCallback, useRef } from 'react';

export type RenderingFunction = (ctx: CanvasRenderingContext2D) => void;

export interface RenderingBus {
    subscribe(renderFn: RenderingFunction): () => void;
    publish(ctx: CanvasRenderingContext2D): void;
    clear(): void;
}

export const useRenderingBus = (): RenderingBus => {
    const renderFunctionsRef = useRef<Set<RenderingFunction>>(new Set());

    const subscribe = useCallback((renderFn: RenderingFunction): (() => void) => {
        renderFunctionsRef.current.add(renderFn);
        
        return () => {
            renderFunctionsRef.current.delete(renderFn);
        };
    }, []);

    const publish = useCallback((ctx: CanvasRenderingContext2D): void => {
        renderFunctionsRef.current.forEach(renderFn => renderFn(ctx));
    }, []);

    const clear = useCallback((): void => {
        renderFunctionsRef.current.clear();
    }, []);

    return {
        subscribe, publish, clear,
    };
};