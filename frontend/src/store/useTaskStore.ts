import { create } from 'zustand';

interface TaskStore {
  selectedTaskId:  number | null;
  flyToLocationCoordinate: [number, number] | null;

  setSelectedTaskId: (id: number | null) => void;
  selectTaskAndFlyTo: (id: number, coordinates: [number, number]) => void;
  clearSelection: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  selectedTaskId: null,
  flyToLocationCoordinate: null,

  setSelectedTaskId: (id) =>
    set({ selectedTaskId: id }),

  selectTaskAndFlyTo: (id, coordinates) =>
    set({
      selectedTaskId: id,
      flyToLocationCoordinate: coordinates,
    }),

  clearSelection: () =>
    set({ selectedTaskId: null, flyToLocationCoordinate: null }),
}));