import { BASE_URL } from "../env";
import type { CreateTaskPayload } from "./types/CreateTaskPayload";
import type { TaskFeature } from "./types/TaskFeature";
import type { TasksGeoJsonResponse } from "./types/TasksGeoJsonResponse";

export const fetchTasksGeoJson = async (): Promise<TasksGeoJsonResponse> => {
  const response = await fetch(`${BASE_URL}/tasks`);
  
  if (!response.ok) {
    throw new Error('error: failed to get all the tasks from the server');
  }
  
  return response.json();
};

export const createTask = async (newTask: CreateTaskPayload): Promise<TaskFeature> => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  });

  if (!response.ok) {
    throw new Error('error: failed to create new task');
  }

  return response.json();
};