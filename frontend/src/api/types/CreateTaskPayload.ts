export interface CreateTaskPayload {
  title: string;
  description?: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}