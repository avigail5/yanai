import React, { useState } from 'react';
import { Popup } from 'react-map-gl/maplibre';
import { useCreateTask } from '../hooks/useTasks';
import { CREATE_TASK_POPUP_TEXTS } from './map/strings';
import { createTaskButton, createTaskButtonContainer, createTaskForm, createTaskInput, createTaskTitle } from './map/map.styles.css';

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
      <form onSubmit={handleSubmit} className={createTaskForm}>
        <h4 className={createTaskTitle}>
            {CREATE_TASK_POPUP_TEXTS.CREATE_TASK}
        </h4>

        <div className={createTaskInput}>
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

        <div className={createTaskInput}>
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

        <div className={createTaskButtonContainer}>
          <button
            type="button"
            onClick={onClose}
            className={createTaskButton}
          >
            {CREATE_TASK_POPUP_TEXTS.CANCEL}
          </button>

          <button
            type="submit"
            disabled={isPending}
            className={createTaskButton}
          >
            {CREATE_TASK_POPUP_TEXTS.CANCEL}
          </button>

          <button
            type="submit"
            disabled={isPending}
            className={createTaskButton}
          >
            {isPending ? CREATE_TASK_POPUP_TEXTS.SAVING : CREATE_TASK_POPUP_TEXTS.CREATE}
          </button>
        </div>
      </form>
    </Popup>
  );
};