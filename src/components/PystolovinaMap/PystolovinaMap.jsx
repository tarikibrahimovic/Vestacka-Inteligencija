import Void from "../../img/void.png";
import Scaffold from "../../img/scaffold.png";
import classes from "./PystolovinaMap.module.css";
import RandomButton from "../RadnomButon/RandomButton";

const tileMap = {
  0: Void,
  1: Scaffold,
};

export default function PystolovinaMap({ map, setMap, Agents, setAgents }) {
  return (
    <div className={classes.main}>
      <RandomButton map={map} setMap={setMap} />
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
                      className={tile === 1 ? classes.scaffold : classes.void}
                    />
                    {Agents.map((agent) => {
                      if (agent.row === rowIndex && agent.col === colIndex) {
                        return (
                          <img
                            src={agent.img}
                            alt={agent.name}
                            key={agent.id}
                            className={classes.agent}
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
