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