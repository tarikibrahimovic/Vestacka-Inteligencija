import { useState } from "react";
import classes from "./Pystolovina.module.css";
import { AiFillSetting } from "react-icons/ai";
import Settings from "../../components/Settings/Settings";
import PystolovinaMap from "../../components/PystolovinaMap/PystolovinaMap";
import { NotificationManager } from "react-notifications";
import Aki from "../../img/Aki.png";
import DefaultAgent from "../../img/DefaultAgent.png";

export default function Pystolovina() {
  const [hiddenSidebar, setHiddenSidebar] = useState(true);
  const [Agents, setAgents] = useState([
    {
      id: 10,
      name: "Teacher1",
      row: null,
      col: null,
      tip: "Aki",
      img: Aki,
      depth: null,
      time: null,
    },
    {
      id: 2,
      name: "User",
      row: null,
      col: null,
      img: DefaultAgent,
      depth: null,
      time: null,
    },
  ]);
  const [mapRows, setMapRows] = useState(null);
  const [mapCols, setMapCols] = useState(null);
  const [map, setMap] = useState([
    [1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0],
  ]);

  const placeAgents = () => {
    let availableCoordinates = [];
    map.map((row, rowIndex) => {
      row.map((column, columnIndex) => {
        if (column === 1) {
          availableCoordinates.push({ row: rowIndex, column: columnIndex });
        }
      });
    });

    if (availableCoordinates.length < Agents.length) {
      NotificationManager.error("Not enough available tiles!", 3000);
    } else {
      setAgents((agent) => {
        return agent.map((item) => {
          let random = Math.floor(Math.random() * availableCoordinates.length);
          let coordinates = availableCoordinates[random];
          availableCoordinates.splice(random, 1);
          return {
            ...item,
            row: coordinates.row,
            col: coordinates.column,
          };
        });
      });
    }
  };

  console.log(Agents);

  return (
    <>
      <Settings
        hiddenSidebar={hiddenSidebar}
        setHiddenSidebar={setHiddenSidebar}
        setMapRows={setMapRows}
        mapRows={mapRows}
        setMapCols={setMapCols}
        mapCols={mapCols}
        map={map}
        setMap={setMap}
        Agents={Agents}
        setAgents={setAgents}
      />
      <div className={`${classes.main} ${!hiddenSidebar && classes.dark}`}>
        <h1>PYSTOLOVnaN</h1>
        <AiFillSetting
          className={classes.settings}
          onClick={() => setHiddenSidebar(!hiddenSidebar)}
        />
        <PystolovinaMap map={map} setMap={setMap} Agents={Agents} setAgents={setAgents}/>
        <button onClick={placeAgents}>PLACE AGENTS</button>
      </div>
    </>
  );
}
