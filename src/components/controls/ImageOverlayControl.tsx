import React, { useCallback, useRef } from "react";
import DragNumberInput from "../ui/DragNumberInput.tsx";
import VectorInput from "../ui/VectorInput.tsx";
import {useImageOverlayStore} from "../../stores/canvas";
import {persistenceService} from "../../services/persistenceService";
import {Vec2} from "../../utils/vector";

// Debounce utility function
function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number): T {
    const timeoutRef = useRef<number | null>(null);

    return useCallback((...args: Parameters<T>) => {
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            callback(...args);
            timeoutRef.current = null;
        }, delay);
    }, [callback, delay]) as T;
}

const ImageOverlayControl: React.FC = () => {
    const {
        setImage: originalSetImage,
        setImageOffset: originalSetImageOffset,
        setImageScale: originalSetImageScale,
        setImageOpacity: originalSetImageOpacity,
        imageOffset,
        imageScale,
        imageOpacity,
    } = useImageOverlayStore();

    // Debounced save function - 500ms delay
    const debouncedSave = useDebounce(() => {
        persistenceService.saveAllStores();
    }, 500);

    // Save immediately without debounce (for critical operations like image upload)
    const saveImmediately = () => {
        persistenceService.saveAllStores();
    };

    // Wrapper functions that save the workspace after updating the store
    const setImage = (image: HTMLImageElement | null, imageData?: string | null) => {
        originalSetImage(image, imageData);
        // For image uploads, save immediately without debounce
        saveImmediately();
    };

    const setImageOffset = (offset: Vec2) => {
        originalSetImageOffset(offset);
        // For position adjustments, use debounced save
        debouncedSave();
    };

    const setImageScale = (scale: number) => {
        originalSetImageScale(scale);
        // For scale adjustments, use debounced save
        debouncedSave();
    };

    const setImageOpacity = (opacity: number) => {
        originalSetImageOpacity(opacity);
        // For opacity adjustments, use debounced save
        debouncedSave();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            if (!event.target?.result) return;

            // Store the base64 data
            const imageData = event.target.result as string;

            // Create image from the data
            const image = new Image();
            image.src = imageData;

            image.onload = () => {
                // Set both the image object and the base64 data
                setImage(image, imageData);
                // Note: No need to call saveAllStores here as it's called in the setImage wrapper
            };
        };

        // Read the file as a data URL (base64)
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