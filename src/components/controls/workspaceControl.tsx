﻿﻿import { useState, useEffect } from 'react';
import { usePersistence } from '../../hooks/persistence';

const WorkspaceControl = () => {
  const persistence = usePersistence();
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [currentWorkspace, setCurrentWorkspace] = useState(persistence.getCurrentWorkspace());

  // Update the current workspace display when it changes
  useEffect(() => {
    setCurrentWorkspace(persistence.getCurrentWorkspace());
  }, [persistence]);

  const handleSwitchWorkspace = () => {
    if (newWorkspaceName.trim() === '') return;

    // Clear current workspace data from memory
    persistence.clearCurrentWorkspace();

    // Try to load data from the new workspace
    const loaded = persistence.loadAllStores(newWorkspaceName);

    // If no data was found, we're creating a new workspace
    if (!loaded) {
      persistence.setCurrentWorkspace(newWorkspaceName);
      persistence.saveAllStores();
    }

    // Update the current workspace display
    setCurrentWorkspace(persistence.getCurrentWorkspace());

    // Reset input field
    setNewWorkspaceName('');
  };

  const handleDebug = () => {
    // Call the debug method to log the current state
    persistence.debugStores();
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <div>
        <strong>Current Workspace:</strong> {currentWorkspace}
      </div>
      <div style={{ display: 'flex', marginTop: '5px' }}>
        <input
          type="text"
          value={newWorkspaceName}
          onChange={(e) => setNewWorkspaceName(e.target.value)}
          placeholder="New workspace name"
          style={{ marginRight: '5px' }}
        />
        <button
          onClick={handleSwitchWorkspace}
          disabled={newWorkspaceName.trim() === ''}
          style={{ marginRight: '5px' }}
        >
          Switch/Create
        </button>
        <button onClick={handleDebug} title="Log store state to console">
          Debug
        </button>
      </div>
    </div>
  );
};

export default WorkspaceControl;
