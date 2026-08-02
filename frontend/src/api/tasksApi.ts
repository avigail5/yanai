export interface TaskFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    id: number;
    title: string;
    description: string | null;
    status: string;
  };
}

export interface TasksGeoJsonResponse {
  type: 'FeatureCollection';
  features: TaskFeature[];
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

const BASE_URL = 'http://localhost:3000';

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