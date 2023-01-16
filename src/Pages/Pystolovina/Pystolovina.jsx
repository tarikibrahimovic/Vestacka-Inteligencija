import { useState } from "react";
import classes from "./Pystolovina.module.css";
import { AiFillSetting } from "react-icons/ai";
import Settings from "../../components/Settings/Settings";
import PystolovinaMap from "../../components/PystolovinaMap/PystolovinaMap";
import { NotificationManager } from "react-notifications";
import DefaultAgent1 from "../../img/DefaultAgent1.png";
import DefaultAgent from "../../img/DefaultAgent.png";
import { useEffect } from "react";
import { useCallback } from "react";

const shiftLeft = (array, n) => {
  // Make a copy of the original array
  let copy = [...array];
  // Shift the elements of the copy by n positions
  for (let i = 0; i < array.length; i++) {
    let j = (i + n) % array.length;
    array[i] = copy[j];
  }
};

export default function Pystolovina() {
  const [hiddenSidebar, setHiddenSidebar] = useState(true);
  const [Agents, setAgents] = useState([
    {
      id: 2,
      name: "User",
      row: null,
      col: null,
      tip: "User",
      img: DefaultAgent1,
      depth: null,
      time: null,
    },
    {
      id: 2,
      name: "User",
      row: null,
      col: null,
      tip: "User",
      img: DefaultAgent,
      depth: null,
      time: null,
    },
  ]);
  const [agentTurnId, setAgentTurnId] = useState();
  const [lastAgentId, setLastAgentId] = useState(0);
  const [mapRows, setMapRows] = useState(null);
  const [mapCols, setMapCols] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeAgent, setActiveAgent] = useState(null);
  const [lostAgents, setLostAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const placeAgents = () => {
    if (isRunning) {
      NotificationManager.error("You can't do that", "Error");
      return;
    }
    setLostAgents([]);
    setAgents((prev) => {
      const newAgents = [...prev];
      newAgents.forEach((agent) => {
        agent.row = null;
        agent.col = null;
      });
      return newAgents;
    });
    setAgentTurnId(1);
    setLoading(false);
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
      const agent = Agents.find((agent) => agent.id === agentId);
      const { row, col } = agent;

      // check all 8 directions
      if (
        row > 0 &&
        map[row - 1][col] === 1 &&
        !Agents.find((agent) => agent.row === row - 1 && agent.col === col)
      )
        return true;

      if (
        row > 0 &&
        col < map[0].length - 1 &&
        map[row - 1][col + 1] === 1 &&
        !Agents.find((agent) => agent.row === row - 1 && agent.col === col + 1)
      )
        return true;

      if (
        col < map[0].length - 1 &&
        map[row][col + 1] === 1 &&
        !Agents.find((agent) => agent.row === row && agent.col === col + 1)
      )
        return true;

      if (
        row < map.length - 1 &&
        col < map[0].length - 1 &&
        map[row + 1][col + 1] === 1 &&
        !Agents.find((agent) => agent.row === row + 1 && agent.col === col + 1)
      )
        return true;

      if (
        row < map.length - 1 &&
        map[row + 1][col] === 1 &&
        !Agents.find((agent) => agent.row === row + 1 && agent.col === col)
      )
        return true;

      if (
        row < map.length - 1 &&
        col > 0 &&
        map[row + 1][col - 1] === 1 &&
        !Agents.find((agent) => agent.row === row + 1 && agent.col === col - 1)
      )
        return true;

      if (
        col > 0 &&
        map[row][col - 1] === 1 &&
        !Agents.find((agent) => agent.row === row && agent.col === col - 1)
      )
        return true;

      if (
        row > 0 &&
        col > 0 &&
        map[row - 1][col - 1] === 1 &&
        !Agents.find((agent) => agent.row === row - 1 && agent.col === col - 1)
      )
        return true;

      return false;
    },
    [Agents, map]
  );

  const agentsOrder = () => {
    if (Agents.some((agent) => agent.row === null || agent.col === null)) {
      NotificationManager.error("Not all agents are on the map!", "", 3000);
      return;
    } else {
      setAgents(shuffle(Agents));
      setAgents((agents) => {
        return agents.map((item, i) => {
          return {
            ...item,
            id: i + 1,
          };
        });
      });
      setAgentTurnId(1);
      setIsRunning(true);
      setLostAgents([]);
    }
  };

  useEffect(() => {
    if (!Agents?.every((agent) => agent.hasOwnProperty("id")) || !isRunning)
      return;

    const shiftedAgents = [...Agents];
    shiftLeft(shiftedAgents, lastAgentId);
    setLostAgents((prevIds) => {
      const newIds = [...prevIds];
      for (const agent of shiftedAgents) {
        if (
          !hasMoves(agent.id) &&
          !newIds.includes(agent.id) &&
          newIds.length < Agents.length - 1
        ) {
          newIds.push(agent.id);
          if (newIds.length === Agents.length - 1) {
            setIsRunning(false);
            NotificationManager.success("Game over!", "", 3000);
          }
        }
      }
      return newIds;
    });
  }, [Agents, hasMoves, isRunning, lastAgentId]);

  const changeAgentTurn = () => {
    const agentsLength = Agents.length;
    setAgentTurnId((prevState) => {
      setLastAgentId(prevState);
      let nextAgentId = (prevState % agentsLength) + 1;
      let agentsWithoutMoves = 0;
      while (1) {
        if (hasMoves(nextAgentId)) {
          return nextAgentId;
        }
        nextAgentId = (nextAgentId % agentsLength) + 1;

        agentsWithoutMoves++;
        if (agentsWithoutMoves === agentsLength) {
          return 0;
        }
      }
      setActiveAgent(Agents.find((agent) => agent.id === nextAgentId));
    });
  };

  useEffect(() => {
    const agentOnTurn = Agents.find((agent) => agent.id === agentTurnId);
    if (
      !isRunning ||
      agentOnTurn?.name === "User" ||
      loading ||
      lostAgents.length === Agents.length - 1
    ) {
      return;
    }
    setLoading(true);
    (async () => {
      const body = {
        map,
        Agents,
        agentTurnId,
      };

      // const baseUrl = "http://127.0.0.1:8000";
      const baseUrl = "https://tarik2508.pythonanywhere.com"
      const response = await fetch(`${baseUrl}/get-path`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const move = data[1];

      setTimeout(() => {
        if (move) {
          let actAgent = Agents.find((agent) => agent.id === agentTurnId);
          const aiAgentPos = [actAgent.row, actAgent.col];
          setMap((prevMap) => {
            let newMap = [...prevMap];
            newMap[aiAgentPos[0]][aiAgentPos[1]] = 0;
            return newMap;
          });
          setAgents((prevAgents) => {
            const newAgents = [...prevAgents];
            const newAgentOnTurn = newAgents.find((a) => a.id === agentTurnId);
            newAgentOnTurn.row = move[0];
            newAgentOnTurn.col = move[1];
            return newAgents;
          });
        }
        setLoading(false);
      }, 300);
      changeAgentTurn();
    })();
  }, [
    agentsOrder,
    map,
    activeAgent,
    agentTurnId,
    isRunning,
    loading,
    lostAgents,
    changeAgentTurn,
  ]);

  useEffect(() => {
    setActiveAgent(Agents.find((agent) => agent.id === agentTurnId));
  }, [agentTurnId, isRunning, activeAgent, map, loading, lostAgents]);

  return (
    <div className={classes.container}>
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
      <div className={`${classes.main}`}>
        <button
          className={classes.options}
          onClick={() => {
            if (isRunning) {
              NotificationManager.error(
                "You can't change settings while game is running!",
                "",
                3000
              );
              return;
            }
            setHiddenSidebar(!hiddenSidebar);
          }}
        >
          Options
          <AiFillSetting className={classes.settings} />
        </button>
        <PystolovinaMap
          map={map}
          setMap={setMap}
          Agents={Agents}
          setAgents={setAgents}
          agentTurnId={agentTurnId}
          hasMoves={hasMoves}
          lostAgents={lostAgents}
          setLostAgents={setLostAgents}
          changeAgentTurn={changeAgentTurn}
          isRunning={isRunning}
          placeAgents={placeAgents}
          agentsOrder={agentsOrder}
        />
      </div>
    </div>
  );
}
