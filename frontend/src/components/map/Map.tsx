import React, { useState } from 'react';
import Map, { Source, Layer, Popup, type LayerProps } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useTasks } from '../../hooks/useTasks';
import { satelliteStyle, mapContainerStyle } from '../../styles.css';
import type { SelectedTaskInfo } from './types/SelectedTaskInfo';
import { layerStyle } from './layers/taskLayer';

const CENTER_ISRAEL_LNG = 34.7818;
const CENTER_ISRAEL_LAT = 32.0853;

export default function TasksMap() {
  const { data: tasksGeoJson, isLoading, isError } = useTasks();

  const [selectedTask, setSelectedTask] = useState<SelectedTaskInfo | null>(null);

  const handleMapClick = (e: any) => {
    const feature = e.features && e.features[0];

    if (feature && feature.layer.id === 'tasks-circles') {
      const coordinates = feature.geometry.coordinates;
      const { title, description, status } = feature.properties || {};

      setSelectedTask({
        longitude: coordinates[0],
        latitude: coordinates[1],
        title,
        description,
        status,
      });
    } else {
      setSelectedTask(null);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Map
        initialViewState={{
          longitude: CENTER_ISRAEL_LNG,
          latitude: CENTER_ISRAEL_LAT,
          zoom: 12,
        }}
        mapStyle={satelliteStyle}
        onClick={handleMapClick}
        interactiveLayerIds={['tasks-circles']}
        style={{ width: '100%', height: '100%' }}
      >
        {tasksGeoJson && (
          <Source id="tasks-source" type="geojson" data={tasksGeoJson}>
            <Layer {...layerStyle} />
          </Source>
        )}

        {selectedTask && (
          <Popup
            longitude={selectedTask.longitude}
            latitude={selectedTask.latitude}
            anchor="bottom"
            onClose={() => setSelectedTask(null)}
            closeOnClick={false}
          >
            <div className="task-popup-container" style={{ padding: '8px', color: '#1f2937' }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold' }}>
                {selectedTask.title ?? 'Untitled Task'}
              </h4>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#4b5563' }}>
                {selectedTask.description ?? 'No description'}
              </p>
              <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <strong>Status:</strong> 
                <span style={{ textTransform: 'capitalize' }}>{selectedTask.status ?? 'N/A'}</span>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}