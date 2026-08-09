import type { LayerProps } from "react-map-gl/maplibre";

 export const layerStyle: LayerProps = {
    id: 'tasks-circles',
    type: 'circle' as const,
    paint: {
      'circle-radius': 8,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff',
      'circle-color': [
        'match',
        ['get', 'status'],
        'open', '#ef4444',
        'in_process', '#f59e0b',
        'closed', '#10b981',
        '#3b82f6',
      ],
    },
  };