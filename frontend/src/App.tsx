import Map from './components/map/Map';
import { TasksNavbar } from './components/navbar/TasksNavbar';
import { mapAppStyle } from './styles.css';

function App() {

  return (
  <div className={mapAppStyle}>
      <Map />
      <TasksNavbar />
    </div>
  )
}

export default App