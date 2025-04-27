import {EdgeStore, NodeSeedStore, NodeStore} from "../../stores/graph";
import CreateNodeCommand from "./CreateNodeCommand.ts";
import {ICommand} from "./ICommand.ts";
import {Vec2} from "../../utils/vector.ts";
import {NodeType} from "../../domain/graph";
import ConnectCommand from "./ConnectCommand.ts";
import MoveNodeCommand from "./MoveNodeCommand.ts";
import DeleteNodeCommand from "./DeleteNodeCommand.ts";
import DeleteEdgeCommand from "./DeleteEdgeCommand.ts";

class CommandFactory {
    constructor(
        private nodeSeedStore: NodeSeedStore,
        private nodeStore: NodeStore,
        private edgeStore: EdgeStore,
    ) { }

    createNodeCommand(nodeType: NodeType, position: Vec2): ICommand {
        return new CreateNodeCommand(nodeType, position, this.nodeSeedStore, this.nodeStore);
    }

    connectCommand(fromId: string, toId: string): ICommand {
        return new ConnectCommand(fromId, toId, this.edgeStore);
    }

    moveNodeCommand(id: string, oldPosition: Vec2, newPosition: Vec2): ICommand {
        return new MoveNodeCommand(id, oldPosition, newPosition, this.nodeStore);
    }

    deleteNodeCommand(id: string): ICommand {
        return new DeleteNodeCommand(id, this.nodeStore, this.edgeStore);
    }

    deleteEdgeCommand(id: string): ICommand {
        return new DeleteEdgeCommand(id, this.edgeStore);
    }
}

export default CommandFactory;