import React from 'react';
import { Popup } from 'react-map-gl/maplibre';
import type { SelectedTaskInfo } from './map/types/SelectedTaskInfo';

interface TaskPopupProps {
  task: SelectedTaskInfo;
  onClose: () => void;
}

export const TaskPopup: React.FC<TaskPopupProps> = ({ task, onClose }) => {
  return (
    <Popup
      longitude={task.longitude}
      latitude={task.latitude}
      anchor="bottom"
      onClose={onClose}
      closeOnClick={false}
    >
      <div className="task-popup-container" style={{ padding: '8px', color: '#1f2937' }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold' }}>
          {task.title ?? 'Untitled Task'}
        </h4>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#4b5563' }}>
          {task.description ?? 'No description'}
        </p>
        <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <strong>Status:</strong>
          <span style={{ textTransform: 'capitalize' }}>{task.status ?? 'N/A'}</span>
        </div>
      </div>
    </Popup>
  );
};