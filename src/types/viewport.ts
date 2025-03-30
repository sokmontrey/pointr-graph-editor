import { ViewportTransform } from './geometry';
import React from 'react';

export interface ViewportManager {
    viewport: ViewportTransform;
    setViewport: React.Dispatch<React.SetStateAction<ViewportTransform>>;
    handlePan: (e: MouseEvent) => void;
    handleZoom: (e: WheelEvent) => void;
}

export interface ViewportSettings {
    initialX?: number;
    initialY?: number;
    initialScale?: number;
    minScale?: number;
    maxScale?: number;
}