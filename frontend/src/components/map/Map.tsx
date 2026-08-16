import React, { useEffect, useRef, useState } from 'react';
import Map, { Source, Layer, Popup, type LayerProps, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useTasks } from '../../hooks/useTasks';
import { satelliteStyle, mapContainerStyle } from '../../styles.css';
import type { SelectedTaskInfo } from './types/SelectedTaskInfo';
import { layerStyle } from './layers/taskLayer';
import { TaskPopup } from '../taskPopup';
import { CreateTaskPopup } from '../createTaskPopup';
import { addButtonVariants, mapWrapper, newTaskButtonContainer } from './map.styles.css';
import { NEW_TASK_BUTTON_TEXTS } from './strings';
import { useTaskStore } from '../../store/useTaskStore';

const CENTER_ISRAEL_LNG = 34.7818;
const CENTER_ISRAEL_LAT = 32.0853;

export default function TasksMap() {
  const mapRef = useRef<MapRef>(null);
  const { data: tasksGeoJson, isLoading, isError } = useTasks();

  const selectedTaskId = useTaskStore((state) => state.selectedTaskId);
  const flyToLocationCoordinate = useTaskStore((state) => state.flyToLocationCoordinate);
  const setSelectedTaskId = useTaskStore((state) => state.setSelectedTaskId);
  const clearSelection = useTaskStore((state) => state.clearSelection);

  const [newTaskLocation, setNewTaskLocation] = useState<{ lng: number; lat: number } | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    if (flyToLocationCoordinate && mapRef.current) {
      mapRef.current.flyTo({
        center: flyToLocationCoordinate,
        zoom: 15,
        duration: 1500,
      });
    }
  }, [flyToLocationCoordinate]);

  const selectedTaskFeature = tasksGeoJson?.features?.find(
    (feature: any) => feature.properties.id === selectedTaskId
  );

  const handleMapClick = (e: any) => {
    const clickedFeature = e.features && e.features[0];

    if (clickedFeature && clickedFeature.layer.id === 'tasks-circles') {
      const taskId = clickedFeature.properties.id;

     setSelectedTaskId(taskId);
      setNewTaskLocation(null);
      setIsAddingTask(false);
      return;
    }

    if (isAddingTask) {
    clearSelection();     
    setNewTaskLocation({
      lng: e.lngLat.lng,
      lat: e.lngLat.lat,
    });
    setIsAddingTask(false);
      return;
  }

  clearSelection();
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
        ref={mapRef}
        reuseMaps
        onLoad={(e) => {
        e.target.resize();
  }}
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

        {selectedTaskFeature && (
         <TaskPopup
            task={{
              longitude: selectedTaskFeature.geometry.coordinates[0],
              latitude: selectedTaskFeature.geometry.coordinates[1],
              title: selectedTaskFeature.properties.title,
              description: selectedTaskFeature.properties.description,
              status: selectedTaskFeature.properties.status,
            }}
            onClose={() => clearSelection()}
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