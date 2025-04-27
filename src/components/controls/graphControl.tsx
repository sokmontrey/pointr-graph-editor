import {useSelectionStore} from "../../stores/main/selectionStore.ts";

const GraphControl = () => {
    const {
        entity: selectedEntity,
        delete: deleteEntity,
    } = useSelectionStore();


    return <div>
        <button
            onClick={deleteEntity}
            disabled={!selectedEntity}
        >
            Delete
        </button>
    </div>;
};

export default GraphControl;