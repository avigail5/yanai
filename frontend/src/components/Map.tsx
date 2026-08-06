import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useTasks } from '../hooks/useTasks';
import { satelliteStyle, mapContainerStyle } from '../styles.css';

const CENTER_ISRAEL_LNG = 34.7818;
const CENTER_ISRAEL_LAT = 32.0853;

export default function Map() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);

  const { data: tasksGeoJson, isLoading, isError } = useTasks();

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: satelliteStyle,
      center: [CENTER_ISRAEL_LNG, CENTER_ISRAEL_LAT],
      zoom: 12,
    });

    map.current.on('load', () => {
      map.current?.resize();
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current || !tasksGeoJson) return;

    const mapInstance = map.current;

    const updateMapData = () => {
      const existingSource = mapInstance.getSource('tasks-source') as maplibregl.GeoJSONSource;

      if (existingSource) {
        existingSource.setData(tasksGeoJson);
      } else {
        mapInstance.addSource('tasks-source', {
          type: 'geojson',
          data: tasksGeoJson,
        });

        mapInstance.addLayer({
          id: 'tasks-circles',
          type: 'circle',
          source: 'tasks-source',
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
              '#3b82f6'
            ],
          },
        });

        mapInstance.on('click', 'tasks-circles', (e) => {
          if (!e.features || e.features.length === 0) return;

          const feature = e.features[0];
          const coordinates = (feature.geometry as GeoJSON.Point).coordinates.slice() as [number, number];
          const { title, description, status } = feature.properties || {};

          new maplibregl.Popup()
            .setLngLat(coordinates)
            .setHTML(`
              <div style="color: #000; padding: 4px;">
                <h4 style="margin: 0 0 4px 0;">${title ?? 'Untitled Task'}</h4>
                <p style="margin: 0 0 4px 0;">${description ?? 'No description'}</p>
                <small><strong>Status:</strong> ${status ?? 'N/A'}</small>
              </div>
            `)
            .addTo(mapInstance);
        });

        mapInstance.on('mouseenter', 'tasks-circles', () => {
          mapInstance.getCanvas().style.cursor = 'pointer';
        });

        mapInstance.on('mouseleave', 'tasks-circles', () => {
          mapInstance.getCanvas().style.cursor = '';
        });
      }
    };

    if (mapInstance.isStyleLoaded()) {
      updateMapData();
    } else {
      mapInstance.once('load', updateMapData);
    }
  }, [tasksGeoJson]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {isLoading && (
        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1, background: '#fff', padding: '4px 8px', borderRadius: 4 }}>
          Loading tasks...
        </div>
      )}
      {isError && (
        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1, background: '#fee2e2', color: '#dc2626', padding: '4px 8px', borderRadius: 4 }}>
          Failed to load tasks
        </div>
      )}
      <div ref={mapContainer} className={mapContainerStyle} />
    </div>
  );
}