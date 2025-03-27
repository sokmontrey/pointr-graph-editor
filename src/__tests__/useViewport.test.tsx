import { renderHook, act } from '@testing-library/react';
import { useViewport } from '../hooks/canvas/useViewport';

describe('useViewport', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useViewport());
    
    expect(result.current.viewport).toEqual({
      x: 0,
      y: 0,
      scale: 1
    });
  });
  
  test('should initialize with custom scale', () => {
    const { result } = renderHook(() => useViewport(2));
    
    expect(result.current.viewport).toEqual({
      x: 0,
      y: 0,
      scale: 2
    });
  });
  
  test('should handle panning correctly', () => {
    const { result } = renderHook(() => useViewport());
    
    act(() => {
      result.current.handlePan(10, 20);
    });
    
    expect(result.current.viewport).toEqual({
      x: 10,
      y: 20,
      scale: 1
    });
    
    // Additional pan should accumulate
    act(() => {
      result.current.handlePan(5, 10);
    });
    
    expect(result.current.viewport).toEqual({
      x: 15,
      y: 30,
      scale: 1
    });
  });
  
  test('should handle zooming correctly', () => {
    const { result } = renderHook(() => useViewport());
    
    // Zoom in (negative deltaY)
    act(() => {
      result.current.handleZoom(100, 100, -100);
    });
    
    // Scale should increase (1.1x)
    expect(result.current.viewport.scale).toBeCloseTo(1.1);
    
    // Zoom out (positive deltaY)
    act(() => {
      result.current.handleZoom(100, 100, 100);
    });
    
    // Scale should decrease back to approximately original
    expect(result.current.viewport.scale).toBeCloseTo(0.99, 1);
  });
  
  test('should update viewport position when zooming', () => {
    const { result } = renderHook(() => useViewport());
    
    // First pan to a position
    act(() => {
      result.current.handlePan(50, 50);
    });
    
    // Then zoom at a specific point
    act(() => {
      result.current.handleZoom(100, 100, -100);
    });
    
    // Position should be adjusted based on zoom point
    expect(result.current.viewport.x).not.toBe(50);
    expect(result.current.viewport.y).not.toBe(50);
  });
});