import Toolbar from "./Toolbar";
import { ImageOverlayManager, ModeManager } from "../types";
import DragNumberInput from "./input/DragNumberInput";
import VectorInput from "./input/VectorInput";

interface ControlsProps {
    modeManager: ModeManager;
    imageOverlayManager: ImageOverlayManager; 
}

const Controls = ({
    modeManager,
    imageOverlayManager,
}: ControlsProps) => {
    return (<div>
        <Toolbar
            setMode={modeManager.setMode}
        />

        {/* A proptotype for image overlay for now */}
        <input
            type="file"
            accept="image/*"
            onChange={(e) => {
                if (!e.target.files) return;
                const file = e.target.files[0];
                const image = new Image();
                image.src = URL.createObjectURL(file);
                image.onload = () => {
                    imageOverlayManager.setImage(image);
                };
            }}
        />

        <VectorInput
            label="Image Position"
            value={imageOverlayManager.imageOffset}
            onChange={imageOverlayManager.setImageOffset}
            step={1}
        />

        <DragNumberInput
            label="Image Scale"
            value={imageOverlayManager.imageScale}
            onChange={imageOverlayManager.setImageScale}
            min={0.01}
            max={2}
            step={0.01}
            dragSensitivity={0.01}
        />

        <DragNumberInput
            label="Image Opacity"
            value={imageOverlayManager.imageOpacity}
            onChange={imageOverlayManager.setImageOpacity}
            min={0}
            max={1}
            step={0.01}
            dragSensitivity={0.01}
        />
    </div>);
};

export default Controls;
