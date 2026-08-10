import React, { useState } from 'react';
import Map, { Source, Layer, Popup, type LayerProps } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useTasks } from '../../hooks/useTasks';
import { satelliteStyle, mapContainerStyle } from '../../styles.css';
import type { SelectedTaskInfo } from './types/SelectedTaskInfo';
import { layerStyle } from './layers/taskLayer';
import { TaskPopup } from '../taskPopup';
import { CreateTaskPopup } from '../createTaskPopup';
import { addButtonVariants, mapWrapper, newTaskButtonContainer } from './map.styles.css';
import { NEW_TASK_BUTTON_TEXTS } from './strings';

const CENTER_ISRAEL_LNG = 34.7818;
const CENTER_ISRAEL_LAT = 32.0853;

export default function TasksMap() {
  const { data: tasksGeoJson, isLoading, isError } = useTasks();

  const [selectedTask, setSelectedTask] = useState<SelectedTaskInfo | null>(null);
  const [newTaskLocation, setNewTaskLocation] = useState<{ lng: number; lat: number } | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleMapClick = (e: any) => {
    const clickedFeature = e.features && e.features[0];

    if (clickedFeature && clickedFeature.layer.id === 'tasks-circles') {
      const coordinates = clickedFeature.geometry.coordinates;
      const { title, description, status } = clickedFeature.properties || {};

      setSelectedTask({
        longitude: coordinates[0],
        latitude: coordinates[1],
        title,
        description,
        status,
      });
      setNewTaskLocation(null);
      setIsAddingTask(false);
      return;
    }
    if (isAddingTask) {
      setSelectedTask(null);
      setNewTaskLocation({
      lng: e.lngLat.lng,
      lat: e.lngLat.lat,
    });
    setIsAddingTask(false);
      return;
  }
    setSelectedTask(null);
    setNewTaskLocation(null);
  };

  return (
    <div className={mapWrapper}>
      <div className={newTaskButtonContainer}>
        <button
          onClick={() => {
            setIsAddingTask((prev) => !prev);
            setNewTaskLocation(null);
          }}
          className={
            isAddingTask
              ? addButtonVariants.cancel
              : addButtonVariants.add
          }
        >
          {isAddingTask ? NEW_TASK_BUTTON_TEXTS.CANCEL : NEW_TASK_BUTTON_TEXTS.ADD}
        </button>
      </div>
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

          {newTaskLocation && (
          <CreateTaskPopup
            location={newTaskLocation}
            onClose={() => setNewTaskLocation(null)}
          />
        )}
      </Map>
    </div>
  );
}