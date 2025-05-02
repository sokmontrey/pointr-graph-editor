import React from 'react';
import {useWorkspace} from "../../hooks/persistence";

const WorkspaceControls = () => {
    const [newWorkspaceName, setNewWorkspaceName] = React.useState('');

    const {
        workspaces,
        currentWorkspace,
        switchWorkspace,
        createWorkspace,
        deleteWorkspace,
    } = useWorkspace();

    const handleSwitchWorkspace = (e: React.ChangeEvent<HTMLSelectElement>) => {
        switchWorkspace(e.target.value);
    };

    const handleCreateWorkspace = () => {
        if (newWorkspaceName.trim() === '') {
            return;
        }
        createWorkspace(newWorkspaceName);
        setNewWorkspaceName('');
    };

    const handleDeleteWorkspace = () => {
        if (workspaces.length === 1) {
            return;
        }
        if (confirm(`Are you sure to delete workspace ${currentWorkspace}?`)) {
            deleteWorkspace();
        }
    };

    return (
        <div>
            <label>
                Workspace:
                <select
                    value={currentWorkspace}
                    onChange={handleSwitchWorkspace}
                >
                    {workspaces.map(workspace => (
                        <option
                            key={workspace}
                            value={workspace}
                        >
                            {workspace}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                New workspace:
                <input
                    type="text"
                    value={newWorkspaceName}
                    onChange={e => setNewWorkspaceName(e.target.value)}
                />
                <button onClick={handleCreateWorkspace}>Create</button>
            </label>

            <button onClick={handleDeleteWorkspace}>Delete Current</button>
        </div>
    );
};

export default WorkspaceControls;
