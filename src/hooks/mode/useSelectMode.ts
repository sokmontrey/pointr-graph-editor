import { Mode } from "../../types";
import { getMousePosition } from "../../utils/mouse";

const useSelectMode = (): Mode => {
    return {
        name: "Select",
        handleMouseMove: (e: MouseEvent) => {
            const pos = getMousePosition(e)
            console.log("Mouse moved at ", pos);
        },
        handleDragging: (e: MouseEvent) => {
            console.log("Dragging at", e.clientX, e.clientY);
        },
        handleClick: (e: MouseEvent) => {
            console.log("Click at", e.clientX, e.clientY);
        },
    };
};

export default useSelectMode;
