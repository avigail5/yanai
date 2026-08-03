// src/hooks/useTasks.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTasksGeoJson, createTask } from '../api/tasksApi';
import type { CreateTaskPayload } from '../api/types/CreateTaskPayload';

const TASKS_QUERY_KEY = ['tasks'];

export const useTasks = () => {
  return useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: fetchTasksGeoJson,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTask: CreateTaskPayload) => createTask(newTask),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });
};