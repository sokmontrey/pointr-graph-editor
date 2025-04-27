import React from "react";
import DragNumberInput from "../ui/DragNumberInput.tsx";
import VectorInput from "../ui/VectorInput.tsx";
import {useImageOverlayStore} from "../../stores/canvas";

const ImageOverlayControl: React.FC = () => {
    const {
        setImage,
        setImageOffset,
        setImageScale,
        setImageOpacity,
        imageOffset,
        imageScale,
        imageOpacity,
    } = useImageOverlayStore();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            if (!event.target?.result) return;
            const imageData = event.target.result as string;
            const image = new Image();
            image.src = imageData;
            image.onload = () => {
                setImage(image, imageData);
            };
        };
        reader.readAsDataURL(file);
    };

    return (<div>
        <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
        />

        <VectorInput
            label="Image Position"
            value={imageOffset}
            onChange={setImageOffset}
            step={1}
        />

        <DragNumberInput
            label="Image Scale"
            value={imageScale}
            onChange={setImageScale}
            min={0.01}
            max={2}
            step={0.01}
            dragSensitivity={0.01}
        />

        <DragNumberInput
            label="Image Opacity"
            value={imageOpacity}
            onChange={setImageOpacity}
            min={0}
            max={1}
            step={0.01}
            dragSensitivity={0.01}
        />
    </div>);
};

export default ImageOverlayControl;