import { useState } from "react";
import { Point } from "../../utils/point";
import { ImageOverlayManager } from "../../types";

export const useImageOverlayManager = (): ImageOverlayManager => {
    const [imageOffset, setImageOffset] = useState<Point>(new Point(0, 0));
    const [imageScale, setImageScale] = useState<number>(1);
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    const draw = (ctx: CanvasRenderingContext2D) => {
        if (!ctx || !image) return;
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
    };
};