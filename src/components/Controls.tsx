import Toolbar from "./Toolbar";
import { ImageOverlayManager, ModeManager } from "../types";

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
    </div>);
};

export default Controls;