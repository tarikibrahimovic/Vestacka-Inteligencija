import { Route, Routes } from 'react-router-dom';
import './App.css';
import Pytanja from './Pages/Pytanja/Pytanja';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <div className="App">
      <NotificationContainer/>
      <Routes>
        <Route path='/' element={<Pytanja/>}/>
        <Route path='/pystolovina' />
      </Routes>
    </div>
  );
}

export default App;
