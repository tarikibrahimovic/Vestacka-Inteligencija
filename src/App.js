import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import Pytanja from "./Pages/Pytanja/Pytanja";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Pystolovina from "./Pages/Pystolovina/Pystolovina";

function App() {
  return (
    <div className="App">
      <NotificationContainer />
      <div className="App-header">
        <NavLink className="link" to="/">Pytanja</NavLink>
        <NavLink className="link" to="/pystolovina">Pystolovina</NavLink>
      </div>
      <Routes>
        <Route path="/" element={<Pytanja />} />
        <Route path="/pystolovina" element={<Pystolovina/>}/>
      </Routes>
    </div>
  );
}

export default App;
