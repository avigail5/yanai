import Map from './components/map/Map';
import { TasksNavbar } from './components/navbar/TasksNavbar';
import { useTaskWebSocket } from './hooks/useTaskWebSocket';
import { mapAppStyle } from './styles.css';

function App() {
  useTaskWebSocket();
  
  return (
  <div className={mapAppStyle}>
      <Map />
      <TasksNavbar />
    </div>
  )
}

export default App