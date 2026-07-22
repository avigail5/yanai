import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { satelliteStyle, mapContainerStyle } from '../styles';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const CENTER_ISRAEL_Y = 34.7818
  const CENTER_ISRAEL_X = 32.0853

  
  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: satelliteStyle,
      center: [CENTER_ISRAEL_Y, CENTER_ISRAEL_X],
      zoom: 12
    });

map.current.on('load', () => {
    map.current.resize();
  });
  
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      style={mapContainerStyle}
    />
  );
}