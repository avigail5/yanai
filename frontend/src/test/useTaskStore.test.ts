import { describe, it, expect, beforeEach } from 'vitest';
import { useTaskStore } from '../store/useTaskStore';

describe('useTaskStore', () => {
  beforeEach(() => {
    useTaskStore.setState({ selectedTaskId: null, flyToLocationCoordinate: null });
  });

  it('should initialize with default null values', () => {
    const state = useTaskStore.getState();
    expect(state.selectedTaskId).toBeNull();
    expect(state.flyToLocationCoordinate).toBeNull();
  });

  it('should update selectedTaskId when setSelectedTaskId is called', () => {
    useTaskStore.getState().setSelectedTaskId(123);
    expect(useTaskStore.getState().selectedTaskId).toBe(123);
  });

  it('should set taskId and flyToLocation together in selectTaskAndFlyTo', () => {
    const coords: [number, number] = [34.7818, 32.0853];
    useTaskStore.getState().selectTaskAndFlyTo(123, coords);

    const state = useTaskStore.getState();
    expect(state.selectedTaskId).toBe(123);
    expect(state.flyToLocationCoordinate).toEqual(coords);
  });

  it('should clear selection correctly', () => {
    useTaskStore.getState().selectTaskAndFlyTo(123, [34.7818, 32.0853]);
    useTaskStore.getState().clearSelection();

    const state = useTaskStore.getState();
    expect(state.selectedTaskId).toBeNull();
    expect(state.flyToLocationCoordinate).toBeNull();
  });
});