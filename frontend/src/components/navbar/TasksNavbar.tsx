import React from 'react';
import { useTasks } from '../../hooks/useTasks';
import { useTaskStore } from '../../store/useTaskStore';
import * as styles from './tasksNavbar.styles.css';
import { TASKS_NAVBAR } from './strings';

export const TasksNavbar = () => {
  const { data: tasksGeoJson, isLoading, isError } = useTasks();

  const selectedTaskId = useTaskStore((state) => state.selectedTaskId);
  const selectTaskAndFlyTo = useTaskStore((state) => state.selectTaskAndFlyTo);

  if (isLoading) {
    return (
      <aside className={styles.navbarContainer}>
        <div className={styles.navbarHeader}>
          <h3 className={styles.navbarTitle}> {TASKS_NAVBAR.TASKS_TITLE} </h3>
        </div>
        <div className={styles.taskList}>
          <p data-testid="loading-message" className={styles.loadingMessage}>
            {TASKS_NAVBAR.LOADING}
          </p>
        </div>
      </aside>
    );
  }

  if (isError) {
    return (
      <aside className={styles.navbarContainer}>
        <div className={styles.navbarHeader}>
          <h3 className={styles.navbarTitle}> {TASKS_NAVBAR.TASKS_TITLE} </h3>
        </div>
        <div className={styles.taskList}>
          <p data-testid="error-message" className={styles.errorMessage}>
            {TASKS_NAVBAR.ERROR}
          </p>
        </div>
      </aside>
    );
  }

  const tasks = tasksGeoJson?.features || [];

  return (
    <aside className={styles.navbarContainer}>
      <div className={styles.navbarHeader}>
        <h3 className={styles.navbarTitle}> {TASKS_NAVBAR.TASKS_TITLE} ({tasks.length})</h3>
      </div>

      <div className={styles.taskList}>
        {tasks.length === 0 ? (
          <p className={styles.noTasksMessage}>
            {TASKS_NAVBAR.NO_TASKS}
          </p>
        ) : (
          tasks.map((feature: any) => {
            const { id, title, description, status } = feature.properties;
            const coordinates = feature.geometry.coordinates as [number, number];
            
            const isSelected = id === selectedTaskId;

            return (
              <div
                key={id}
                className={
                  isSelected
                    ? styles.taskCardVariants.selected
                    : styles.taskCardVariants.normal
                }
                onClick={() => {
                  selectTaskAndFlyTo(id, coordinates);
                }}
              >
                <h4 className={styles.taskCardTitle}>{title}</h4>
                
                {description && (
                  <p className={styles.taskCardDescription}>{description}</p>
                )}

                {status && (
                  <span className={styles.taskStatusBadge}>{status}</span>
                )}
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};