﻿import { useNodeStore } from '../../stores/nodeStore';
import { useNodeSeedStore } from '../../stores/nodeSeedStore';
import { Vec2 } from '../../utils/vector';
import { NodeType } from '../../domain/graph';

// Mock the nodeSeedStore
jest.mock('../../stores/nodeSeedStore', () => ({
  useNodeSeedStore: {
    getState: jest.fn().mockReturnValue({
      nextSeed: jest.fn().mockImplementation(() => 123)
    })
  }
}));

describe('nodeStore', () => {
  // Reset the store before each test
  beforeEach(() => {
    useNodeStore.setState({ nodes: [] });
  });

  it('should initialize with empty nodes array', () => {
    const state = useNodeStore.getState();
    expect(state.nodes).toEqual([]);
  });

  it('should add a node', () => {
    const position = new Vec2(100, 200);
    const nodeType: NodeType = { name: 'TestNode', color: 'red' };

    useNodeStore.getState().addNode(position, nodeType);

    const state = useNodeStore.getState();
    expect(state.nodes.length).toBe(1);
    expect(state.nodes[0].position).toEqual(position);
    expect(state.nodes[0].type).toEqual(nodeType);
    expect(state.nodes[0].id).toBe('123');
    expect(useNodeSeedStore.getState().nextSeed).toHaveBeenCalledWith('TestNode');
  });

  describe('ID generation', () => {
    // Extract the mock function for easier testing
    const mockNextSeed = jest.fn().mockImplementation(() => 123);

    beforeEach(() => {
      mockNextSeed.mockClear();
      jest.mocked(useNodeSeedStore.getState).mockReturnValue({
        nextSeed: mockNextSeed,
        seed: {},
        loadSeed: jest.fn()
      });
    });

    it('should use nodeSeedStore to generate IDs', () => {
      const position = new Vec2(100, 200);
      const nodeType: NodeType = { name: 'TestNode', color: 'red' };

      useNodeStore.getState().addNode(position, nodeType);

      expect(mockNextSeed).toHaveBeenCalledWith('TestNode');
      expect(mockNextSeed).toHaveBeenCalledTimes(1);
    });

    it('should convert the seed number to string for the ID', () => {
      // Mock a different return value for this test
      mockNextSeed.mockReturnValueOnce(456);

      const position = new Vec2(100, 200);
      const nodeType: NodeType = { name: 'TestNode', color: 'red' };

      useNodeStore.getState().addNode(position, nodeType);

      const state = useNodeStore.getState();
      expect(state.nodes[0].id).toBe('456');
    });

    it('should generate different IDs for different node types', () => {
      // Set up mock to return different values based on node type
      mockNextSeed
        .mockReturnValueOnce(1) // First call for TestNode1
        .mockReturnValueOnce(2); // Second call for TestNode2

      const position1 = new Vec2(100, 200);
      const nodeType1: NodeType = { name: 'TestNode1', color: 'red' };

      const position2 = new Vec2(300, 400);
      const nodeType2: NodeType = { name: 'TestNode2', color: 'blue' };

      useNodeStore.getState().addNode(position1, nodeType1);
      useNodeStore.getState().addNode(position2, nodeType2);

      const state = useNodeStore.getState();
      expect(state.nodes[0].id).toBe('1');
      expect(state.nodes[1].id).toBe('2');
      expect(mockNextSeed).toHaveBeenCalledWith('TestNode1');
      expect(mockNextSeed).toHaveBeenCalledWith('TestNode2');
      expect(mockNextSeed).toHaveBeenCalledTimes(2);
    });
  });

  it('should remove a node', () => {
    // Add a node first
    const position = new Vec2(100, 200);
    const nodeType: NodeType = { name: 'TestNode', color: 'red' };

    useNodeStore.getState().addNode(position, nodeType);
    const state = useNodeStore.getState();
    const nodeId = state.nodes[0].id;

    // Remove the node
    useNodeStore.getState().removeNode(nodeId);

    // Check if node was removed
    const updatedState = useNodeStore.getState();
    expect(updatedState.nodes.length).toBe(0);
  });

  it('should move a node', () => {
    // Add a node first
    const position = new Vec2(100, 200);
    const nodeType: NodeType = { name: 'TestNode', color: 'red' };

    useNodeStore.getState().addNode(position, nodeType);
    const state = useNodeStore.getState();
    const nodeId = state.nodes[0].id;

    // Move the node
    const newPosition = new Vec2(300, 400);
    useNodeStore.getState().moveNode(nodeId, newPosition);

    // Check if node was moved
    const updatedState = useNodeStore.getState();
    expect(updatedState.nodes[0].position).toEqual(newPosition);
  });

  it('should update a node ID', () => {
    // Add a node first
    const position = new Vec2(100, 200);
    const nodeType: NodeType = { name: 'TestNode', color: 'red' };

    useNodeStore.getState().addNode(position, nodeType);
    const state = useNodeStore.getState();
    const nodeId = state.nodes[0].id;

    // Update the node ID
    const newId = 'new-id-123';
    useNodeStore.getState().updateNodeId(nodeId, newId);

    // Check if node ID was updated
    const updatedState = useNodeStore.getState();
    expect(updatedState.nodes[0].id).toBe(newId);
  });

  it('should load nodes', () => {
    const nodes = [
      {
        id: 'node-1',
        type: { name: 'TestNode1', color: 'red' },
        position: new Vec2(100, 200)
      },
      {
        id: 'node-2',
        type: { name: 'TestNode2', color: 'blue' },
        position: new Vec2(300, 400)
      }
    ];

    useNodeStore.getState().loadNodes(nodes);

    const state = useNodeStore.getState();
    expect(state.nodes).toEqual(nodes);
    expect(state.nodes.length).toBe(2);
  });

  it('should clear nodes', () => {
    // Add some nodes first
    const nodes = [
      {
        id: 'node-1',
        type: { name: 'TestNode1', color: 'red' },
        position: new Vec2(100, 200)
      },
      {
        id: 'node-2',
        type: { name: 'TestNode2', color: 'blue' },
        position: new Vec2(300, 400)
      }
    ];

    useNodeStore.getState().loadNodes(nodes);

    // Clear the nodes
    useNodeStore.getState().clearNodes();

    // Check if nodes were cleared
    const state = useNodeStore.getState();
    expect(state.nodes).toEqual([]);
    expect(state.nodes.length).toBe(0);
  });
});
