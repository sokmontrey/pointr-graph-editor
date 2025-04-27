import React, {useState, useEffect} from 'react';
import {usePersistence} from "../../hooks/persistence";

export default function WorkspaceControls() {
    const persistence = usePersistence();
    const [workspaces, setWorkspaces] = useState<string[]>([]);
    const [current, setCurrent] = useState<string>('');
    const [newWorkspace, setNewWorkspace] = useState<string>('');

    useEffect(() => {
        refreshWorkspaces();
    }, []);

    function refreshWorkspaces() {
        const all = persistence.getAllWorkspaces();
        setWorkspaces(all);
        const curr = persistence.getCurrentWorkspace();
        setCurrent(curr);
    }

    function onWorkspaceChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const workspaceName = e.target.value;
        setCurrent(workspaceName);
        persistence.clearCurrentWorkspace();

        const loaded = persistence.loadAllStores(workspaceName);
        if (!loaded) {
            persistence.setCurrentWorkspace(workspaceName);
            persistence.saveAllStores();
        }
    }

    function createWorkspace() {
        if (!newWorkspace) return;
        persistence.setCurrentWorkspace(newWorkspace);
        persistence.saveAllStores();
        setNewWorkspace('');
        refreshWorkspaces();
    }

    function deleteWorkspace() {
        if (!confirm(`Delete workspace '${current}'? This cannot be undone.`)) {
            return;
        }
        persistence.clearCurrentWorkspace();
        // TODO: implement delete workspace in persistence service
        refreshWorkspaces();
    }

    return (
        <div>
            <label>
                Workspace:
                <select value={current} onChange={onWorkspaceChange}>
                    {workspaces.map(ws => (
                        <option key={ws} value={ws}>{ws}</option>
                    ))}
                </select>
            </label>

            <label>
                New workspace:
                <input
                    type="text"
                    value={newWorkspace}
                    onChange={e => setNewWorkspace(e.target.value)}
                />
                <button onClick={createWorkspace}>Create</button>
            </label>

            <button onClick={deleteWorkspace}>Delete Current</button>
        </div>
    );
}
