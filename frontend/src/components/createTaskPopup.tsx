import React, { useState } from 'react';
import { Popup } from 'react-map-gl/maplibre';
import { useCreateTask } from '../hooks/useTasks';
import { CREATE_TASK_POPUP_TEXTS } from './map/strings';

interface CreateTaskPopupProps {
  location: { lng: number; lat: number };
  onClose: () => void;
}

export const CreateTaskPopup: React.FC<CreateTaskPopupProps> = ({ location, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { mutate: createTask, isPending } = useCreateTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    createTask(
      {
        title,
        description,
        location: {
          type: 'Point',
          coordinates: [location.lng, location.lat],
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Popup
      longitude={location.lng}
      latitude={location.lat}
      anchor="bottom"
      onClose={onClose}
      closeOnClick={false}
    >
      <form onSubmit={handleSubmit} style={{ padding: '8px', minWidth: '200px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>
            {CREATE_TASK_POPUP_TEXTS.CREATE_TASK}
        </h4>

        <div style={{ marginBottom: '8px' }}>
          <input
            type="text"
            placeholder={CREATE_TASK_POPUP_TEXTS.TITLE}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '6px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '8px' }}>
          <textarea
            placeholder={CREATE_TASK_POPUP_TEXTS.DESCRIPTION}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              padding: '6px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
              resize: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            {CREATE_TASK_POPUP_TEXTS.CANCEL}
          </button>

          <button
            type="submit"
            disabled={isPending}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: 'none',
              background: '#2563eb',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            {isPending ? CREATE_TASK_POPUP_TEXTS.SAVING : CREATE_TASK_POPUP_TEXTS.CREATE}
          </button>
        </div>
      </form>
    </Popup>
  );
};