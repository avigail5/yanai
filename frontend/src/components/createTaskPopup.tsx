import React, { useState } from 'react';
import { Popup } from 'react-map-gl/maplibre';
import { useCreateTask } from '../hooks/useTasks';

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
          יצירת משימה חדשה
        </h4>

        <div style={{ marginBottom: '8px' }}>
          <input
            type="text"
            placeholder="כותרת המשימה"
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
            placeholder="תיאור (אופציונלי)"
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
            ביטול
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
            {isPending ? 'שומר...' : 'צור משימה'}
          </button>
        </div>
      </form>
    </Popup>
  );
};