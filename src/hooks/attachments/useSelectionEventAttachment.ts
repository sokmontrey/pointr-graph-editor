import {EventBus} from "../event";
import {SelectionStore} from "../../stores/main/selectionStore.ts";
import {useEffect} from "react";

export const useSelectionEventAttachment = (eventBus: EventBus, selectionStore: SelectionStore) => {
    useEffect(() => {
        const handleDelete = () => {
            selectionStore.delete();
        };

        const unsubscribes = [
            eventBus.subscribe('keypress', ({ key }) => {
                if (key === 'Delete') {
                    handleDelete();
                }
            }),
        ];

        return () => {
            unsubscribes.forEach((unsubscribe) => unsubscribe());
        };
    }, [eventBus, selectionStore]);
};