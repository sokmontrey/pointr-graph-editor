import { Mode } from "../../types/Mode";

const useCreateNodeMode = (): Mode => {
    return {
        name: "Create Node",
        handleMouseMove : (e: MouseEvent) => {
            console.log("Mouse moved at", e.clientX, e.clientY);
        },
        handleDragging: (e: MouseEvent) => {
            console.log("Dragging at", e.clientX, e.clientY);
        },
        handleDragEnd: (e: MouseEvent) => {
            console.log("Selection ended at", e.clientX, e.clientY);
        },
        handleClick : (e: MouseEvent) => {
            console.log("Click at", e.clientX, e.clientY);
        },
    };
};

export default useCreateNodeMode;
