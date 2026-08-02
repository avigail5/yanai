import type { TaskFeature } from "./TaskFeature";

export interface TasksGeoJsonResponse {
  type: 'FeatureCollection';
  features: TaskFeature[];
}