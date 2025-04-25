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
        console.log(props);
    }
    handleDragging(props: EventPropMap["dragging"]): void {
        console.log(props);
    }
    handleClick(props: EventPropMap["click"]): void {
        console.log(props);
    }

}

