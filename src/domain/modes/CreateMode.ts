import {IMode} from "./IMode.ts";
import {NodeType} from "../graph/node.ts";

export class CreateMode implements IMode {
    name = "Create";
    nodeType: NodeType;

    constructor(nodeType: NodeType) {
        this.name = "Create " + nodeType.name;
        this.nodeType = nodeType;
    }

    handleMouseMove(e: MouseEvent) {
        console.log("Mouse moved at", e.clientX, e.clientY);
    }

    handleDragging(e: MouseEvent) {
        console.log("Dragging at", e.clientX, e.clientY);
    }

    handleClick(e: MouseEvent) {
        console.log("Click at", e.clientX, e.clientY);
    }
}
