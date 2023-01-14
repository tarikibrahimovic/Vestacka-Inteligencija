import { useState } from "react";
import classes from "./Pystolovina.module.css";
import { AiFillSetting } from "react-icons/ai";
import Settings from "../../components/Settings/Settings";
import PystolovinaMap from "../../components/PystolovinaMap/PystolovinaMap";
import { NotificationManager } from "react-notifications";
import Aki from "../../img/Aki.png";
import DefaultAgent from "../../img/DefaultAgent.png";
import { useEffect } from "react";
import { useCallback } from "react";

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
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
      depth: 2,
      time: 20,
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
  const [agentTurnId, setAgentTurnId] = useState();
  const [mapRows, setMapRows] = useState(null);
  const [mapCols, setMapCols] = useState(null);
  const [isRunning, setIsRunning] = useState(false)
  const [lastAgentId, setLastAgentId] = useState(0)
  const [loading, setLoading] = useState(false)
  const [map, setMap] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);
  const agentOnTurn = Agents.find((agent) => agent.id === agentTurnId)

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
      NotificationManager.error("Not enough available tiles!", "Error");
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

  const hasMoves = useCallback(
    (agentId) => {
      const agent = Agents.find((agent) => agent.id === agentId)
      const { row, col } = agent

      // check all 8 directions
      if (
        row > 0 &&
        map[row - 1][col] === 1 &&
        !Agents.find((agent) => agent.row === row - 1 && agent.col === col)
      )
        return true

      if (
        row > 0 &&
        col < map[0].length - 1 &&
        map[row - 1][col + 1] === 1 &&
        !Agents.find((agent) => agent.row === row - 1 && agent.col === col + 1)
      )
        return true

      if (
        col < map[0].length - 1 &&
        map[row][col + 1] === 1 &&
        !Agents.find((agent) => agent.row === row && agent.col === col + 1)
      )
        return true

      if (
        row < map.length - 1 &&
        col < map[0].length - 1 &&
        map[row + 1][col + 1] === 1 &&
        !Agents.find((agent) => agent.row === row + 1 && agent.col === col + 1)
      )
        return true

      if (
        row < map.length - 1 &&
        map[row + 1][col] === 1 &&
        !Agents.find((agent) => agent.row === row + 1 && agent.col === col)
      )
        return true

      if (
        row < map.length - 1 &&
        col > 0 &&
        map[row + 1][col - 1] === 1 &&
        !Agents.find((agent) => agent.row === row + 1 && agent.col === col - 1)
      )
        return true

      if (
        col > 0 &&
        map[row][col - 1] === 1 &&
        !Agents.find((agent) => agent.row === row && agent.col === col - 1)
      )
        return true

      if (
        row > 0 &&
        col > 0 &&
        map[row - 1][col - 1] === 1 &&
        !Agents.find((agent) => agent.row === row - 1 && agent.col === col - 1)
      )
        return true

      return false
    },
    [Agents, map]
  )


  const agentsOrder = () => {
    if(Agents.some(agent => agent.row === null || agent.col === null)){
      NotificationManager.error("Not all agents are on the map!", "", 3000);
      return
    }
    else{
      setAgents(shuffle(Agents));
      setAgents(agents => {
        return agents.map((item, i) => {
          console.log(item);
          return {
            ...item,
            id: i
          }
        })
      })
      setAgentTurnId(0)
      setIsRunning(true)
    }
  }

  const updateGameStatus = useCallback(() => {
    const agentsLength = Agents.length
    setAgentTurnId((prevState) => {
      setLastAgentId(prevState)
      let nextAgentId = (prevState % agentsLength) + 1
      let agentsWithoutMoves = 0
      while (1) {
        if (hasMoves(nextAgentId)) return nextAgentId
        nextAgentId = (nextAgentId % agentsLength) + 1

        agentsWithoutMoves++
        if (agentsWithoutMoves === agentsLength) {
          return 0
        }
      }
    })
  }, [Agents, hasMoves])

  useEffect(() => {
    if(!isRunning){
      return
    }
    ;(async () => {
      const body = {
        map,
        Agents,
        agentTurnId,
      }

      // AI move
      const baseUrl = "http://127.0.0.1:8000"
      const response = await fetch(`${baseUrl}/get-path`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })


      const data = await response.json()
      console.log(data);
      const move = data[1]

      setTimeout(() => {
        if (move) {
          const aiAgentPos = [agentOnTurn.row, agentOnTurn.col]
          setMap((prevMap) => {
            let newMap = [...prevMap]
            newMap[aiAgentPos[0]][aiAgentPos[1]] = 0
            return newMap
          })
          setAgents((prevAgents) => {
            const newAgents = [...prevAgents]
            const newAgentOnTurn = newAgents.find((a) => a.id === agentTurnId)
            newAgentOnTurn.row = move[0]
            newAgentOnTurn.col = move[1]
            return newAgents
          })
        }

        updateGameStatus()
        setLoading(false)
      }, 300)
  })()
},[agentsOrder, updateGameStatus])

  console.log(Agents)

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
        <button onClick={agentsOrder}>START</button>
      </div>
    </>
  );
}
