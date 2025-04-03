import Toolbar from "./Toolbar";
import { ImageOverlayManager, ModeManager } from "../types";
import StepperInput from "./input/StepperInput";
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
            step={10}
        />

        <StepperInput
            label="Image Scale"
            value={imageOverlayManager.imageScale}
            onChange={imageOverlayManager.setImageScale}
            min={0.01}
            max={2}
            step={0.05}
        />

        <StepperInput
            label="Image Opacity"
            value={imageOverlayManager.imageOpacity}
            onChange={imageOverlayManager.setImageOpacity}
            min={0}
            max={1}
            step={0.05}
        />
    </div>);
};

export default Controls;
