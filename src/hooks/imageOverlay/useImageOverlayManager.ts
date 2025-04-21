import { useState, useCallback } from "react";
import { Vec2 } from "../../utils/vector";
import { ImageOverlayManager } from "../../types";

export const useImageOverlayManager = (): ImageOverlayManager => {
    const [imageOffset, setImageOffset] = useState<Vec2>(new Vec2(0, 0));
    const [imageScale, setImageScale] = useState<number>(1);
    const [imageOpacity, setImageOpacity] = useState<number>(1);
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    const draw = useCallback((ctx: CanvasRenderingContext2D) => {
        if (!ctx || !image) return;
        ctx.globalAlpha = imageOpacity;
        ctx.drawImage(
            image,
            imageOffset.x,
            imageOffset.y,
            image.width * imageScale,
            image.height * imageScale,
        );
    }, [image, imageOffset, imageScale, imageOpacity]);

    return {
        draw,
        setImage,
        setImageOffset,
        setImageScale,
        imageOffset,
        imageScale,
        imageOpacity,
        setImageOpacity,
    };
};