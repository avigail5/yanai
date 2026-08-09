import React, { useState } from 'react';
import Map, { Source, Layer, Popup, type LayerProps } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useTasks } from '../../hooks/useTasks';
import { satelliteStyle, mapContainerStyle } from '../../styles.css';
import type { SelectedTaskInfo } from './types/SelectedTaskInfo';
import { layerStyle } from './layers/taskLayer';
import { TaskPopup } from '../taskPopup';

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
         <TaskPopup
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        )}
      </Map>
    </div>
  );
}