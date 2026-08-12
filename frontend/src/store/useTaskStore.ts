import { create } from 'zustand';

interface TaskStore {
  selectedTaskId:  number | null;
  flyToLocation: [number, number] | null;

  setSelectedTaskId: (id: number | null) => void;
  selectTaskAndFlyTo: (id: number, coordinates: [number, number]) => void;
  clearSelection: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  selectedTaskId: null,
  flyToLocation: null,

  setSelectedTaskId: (id) =>
    set({ selectedTaskId: id }),

  selectTaskAndFlyTo: (id, coordinates) =>
    set({
      selectedTaskId: id,
      flyToLocation: coordinates,
    }),

  clearSelection: () =>
    set({ selectedTaskId: null, flyToLocation: null }),
}));