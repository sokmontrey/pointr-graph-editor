import React from 'react';
import {useWorkspace} from "../../hooks/persistence";
import Input from "../ui/Input";
import {Delete02Icon, PlusSignIcon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import SelectInput from "../ui/SelectInput.tsx";

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
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Workspace:</label>
                <SelectInput
                    value={currentWorkspace}
                    onChange={handleSwitchWorkspace}
                    options={workspaces}
                    className="flex-1"
                />
                <HugeiconsIcon
                    icon={Delete02Icon}
                    strokeWidth={2}
                    size={18}
                    onClick={handleDeleteWorkspace}
                    className={` ml-2 transition-all duration-200 text-gray-500 hover:text-red-500 hover:-translate-y-0.5 cursor-pointer`} />
            </div>

            <div className="flex items-center gap-2">
                <Input
                    value={newWorkspaceName}
                    onChange={e => setNewWorkspaceName(e.target.value)}
                    placeholder="New workspace name"
                    className="flex-1"
                />
                <HugeiconsIcon
                    icon={PlusSignIcon}
                    strokeWidth={2}
                    size={18}
                    onClick={handleCreateWorkspace}
                    className={` transition-all duration-200 text-blue-500 hover:text-blue-500 hover:-translate-y-0.5 cursor-pointer`} />
            </div>
        </div>
    );
};

export default WorkspaceControls;
