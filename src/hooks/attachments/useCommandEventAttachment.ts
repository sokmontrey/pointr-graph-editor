import {useEffect} from "react";
import {EventBus} from "../event";
import {CommandStore} from "../../stores/main";

export const useCommandEventAttachment = (eventBus: EventBus, commandStore: CommandStore) => {
    useEffect(() => {
        const handleUndo = () => {
            commandStore.undo();
        };

        const handleRedo = () => {
            commandStore.redo();
        };

        const unsubscribes = [
            eventBus.subscribe('keypress', ({ key, ctrlKey }) => {
                if (ctrlKey && key === 'KeyZ') {
                    handleUndo();
                } else if (ctrlKey && key === 'KeyY') {
                    handleRedo();
                }
            }),
        ];

        return () => {
            unsubscribes.forEach((unsubscribe) => unsubscribe());
        };
    }, [eventBus, commandStore]);
};