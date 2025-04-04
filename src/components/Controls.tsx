import Toolbar from "./Toolbar";
import { ImageOverlayManager, ModeManager } from "../types";
import ImageOverlayControls from "./ImageOverlayControls";

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

        <ImageOverlayControls
            imageOverlayManager={imageOverlayManager}
        />
    </div>);
};

export default Controls;
