import {useEffect, useState} from "react";
import {persistenceService} from "../../services/persistenceService.ts";

export const useWorkspace = () => {
    const [workspaces, setWorkspaces] = useState(persistenceService.getAllWorkspaces());
    const [currentWorkspace, setCurrentWorkspace] = useState(persistenceService.getCurrentWorkspace());

    const switchWorkspace = (newWorkspace: string, saveCurrent: boolean = true) => {
        // TODO: use async
        if (saveCurrent) {
            persistenceService.saveAllStores(currentWorkspace);
        }
        persistenceService.clearCurrentWorkspace();
        persistenceService.loadAllStores(newWorkspace);
        setCurrentWorkspace(newWorkspace);
        persistenceService.setCurrentWorkspace(newWorkspace);
    };

    const createWorkspace = (newWorkspace: string) => {
        if (persistenceService.isWorkspaceExist(newWorkspace)) {
            return;
        }

        if (workspaces.length === 0) {
            // if no workspaces exist, use the current one as a new one.
            persistenceService.saveAllStores(newWorkspace);
        } else {
            // if workspaces exist, save the current one and clear it.
            persistenceService.saveAllStores(currentWorkspace);
            persistenceService.clearCurrentWorkspace();
            // save the new workspace with the cleared data.
            persistenceService.saveAllStores(newWorkspace);
        }

        setWorkspaces([...workspaces, newWorkspace]);
        setCurrentWorkspace(newWorkspace);
        persistenceService.setCurrentWorkspace(newWorkspace);
    };

    const deleteWorkspace = () => {
        if (workspaces.length === 1) {
            return;
        }
        persistenceService.deleteWorkspace(currentWorkspace);
        const newWorkspaces = workspaces.filter(workspace => workspace !== currentWorkspace);
        setWorkspaces(newWorkspaces);
        switchWorkspace(workspaces[0], false);
    };

    useEffect(() => {
        persistenceService.loadAllStores(currentWorkspace);
    }, [currentWorkspace]);

    return {
        workspaces,
        currentWorkspace,
        switchWorkspace,
        createWorkspace,
        deleteWorkspace,
    };
};