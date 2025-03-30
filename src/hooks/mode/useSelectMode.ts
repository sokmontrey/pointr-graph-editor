import { Mode } from "../../types";

const useSelectMode = (): Mode => {
    return {
        name: "Select",
        handleMouseMove: (e: MouseEvent) => {
            console.log("Mouse moved at", e.clientX, e.clientY);
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
