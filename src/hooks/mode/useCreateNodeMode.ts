import { NodeType } from "../../types/Graph";
import { Mode } from "../../types/Mode";

const useCreateNodeMode = (nodeType: NodeType): Mode => {
    return {
        name: `Create ${nodeType.name}`,
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
