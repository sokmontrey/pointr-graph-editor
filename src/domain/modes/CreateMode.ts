import {IMode} from "./IMode.ts";
import {NodeType} from "../graph/node.ts";
import { EventPropMap } from "../../hooks/useEventBus.ts";

export class CreateMode implements IMode {
    name = "Create";
    nodeType: NodeType;

    constructor(nodeType: NodeType) {
        this.name = "Create " + nodeType.name;
        this.nodeType = nodeType;
    }

    handleMouseMove(props: EventPropMap["mousemove"]): void {
        throw new Error("Method not implemented.");
    }
    handleDragging(props: EventPropMap["dragging"]): void {
        throw new Error("Method not implemented.");
    }
    handleClick(props: EventPropMap["click"]): void {
        throw new Error("Method not implemented.");
    }

}

