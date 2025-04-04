import { useState } from "react";
import { Vec2 } from "../../utils/vector";
import { ImageOverlayManager } from "../../types";

export const useImageOverlayManager = (): ImageOverlayManager => {
    const [imageOffset, setImageOffset] = useState<Vec2>(new Vec2(0, 0));
    const [imageScale, setImageScale] = useState<number>(1);
    const [imageOpacity, setImageOpacity] = useState<number>(1);
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    const draw = (ctx: CanvasRenderingContext2D) => {
        if (!ctx || !image) return;
        ctx.globalAlpha = imageOpacity;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(
            image,
            imageOffset.x,
            imageOffset.y,
            image.width * imageScale,
            image.height * imageScale,
        );
    };

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