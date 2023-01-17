import Void from "../../img/void.png";
import Scaffold from "../../img/scaffold.png";
import classes from "./PystolovinaMap.module.css";
import RandomButton from "../RadnomButon/RandomButton";
import { NotificationManager } from "react-notifications";
import End from "../../img/x.png";

const tileMap = {
  0: Void,
  1: Scaffold,
};

export default function PystolovinaMap({
  map,
  setMap,
  Agents,
  setAgents,
  hasMoves,
  agentTurnId,
  lostAgents,
  setLostAgents,
  changeAgentTurn,
  isRunning,
  placeAgents,
  agentsOrder,
}) {
  const availableMove = (agentId, row, col) => {
    const agent = Agents?.find((agent) => agent.id === agentId);
    if (map[row][col] === 0) return false;
    if (Math.abs(agent.row - row) > 1 || Math.abs(agent.col - col) > 1)
      return false;
    return true;
  };

  const moveHandler = (row, col) => {
    if (!isRunning) return;
    const activeAgent = Agents?.find((agent) => agent.id === agentTurnId);
    if (activeAgent.name === "User") {
      if (hasMoves(activeAgent.id)) {
        if (availableMove(activeAgent.id, row, col)) {
          const prevRow = activeAgent.row;
          const prevCol = activeAgent.col;

          setMap((prevMap) => {
            const newMap = [...prevMap];
            newMap[prevRow][prevCol] = 0;
            return newMap;
          });
          setAgents((prevAgents) => {
            const newAgents = [...prevAgents];
            const agentIndex = newAgents.findIndex(
              (agent) => agent.id === activeAgent.id
            );
            newAgents[agentIndex].row = row;
            newAgents[agentIndex].col = col;
            return newAgents;
          });
          changeAgentTurn();
        } else {
          NotificationManager.error("You can't move there");
        }
      } else {
        NotificationManager.error("You have no moves left");
        setLostAgents([...lostAgents, activeAgent.id]);
      }
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.buttonContainer}>
        <RandomButton
          map={map}
          setMap={setMap}
          setLostAgents={setLostAgents}
          setAgents={setAgents}
          isRunning={isRunning}
        />
        <button onClick={placeAgents} className={classes.place}>
          Place Agents
        </button>
        <button
          onClick={(e) => {
            if (Agents?.length < 2) {
              console.log(Agents);
              NotificationManager.error("Pick more agents");
              return;
            }
            agentsOrder();
          }}
          className={classes.order}
        >
          Start
        </button>
      </div>
      <div className={classes.map}>
        {map.map((row, rowIndex) => {
          return (
            <div className={classes.row}>
              {row.map((tile, colIndex) => {
                return (
                  <div className={classes.contentHolder}>
                    <img
                      src={tileMap[tile]}
                      alt={tile}
                      key={rowIndex + colIndex}
                      onClick={() => moveHandler(rowIndex, colIndex)}
                      className={tile === 1 ? classes.scaffold : classes.void}
                    />
                    {Agents?.map((agent) => {
                      if (agent.row === rowIndex && agent.col === colIndex) {
                        return (
                          <img
                            src={agent.img}
                            alt={agent.name}
                            key={agent.id}
                            className={`${classes.agent} ${
                              agentTurnId === agent.id && isRunning
                                ? classes.activeAgent
                                : ""
                            }`}
                          />
                        );
                      }
                    })}
                    {lostAgents?.map((agentId) => {
                      const agent = Agents?.find(
                        (agent) => agent.id === agentId
                      );
                      if (agent?.row === rowIndex && agent?.col === colIndex) {
                        return (
                          <img
                            src={End}
                            alt={agent.name}
                            key={agent.id}
                            className={classes.end}
                          />
                        );
                      }
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
