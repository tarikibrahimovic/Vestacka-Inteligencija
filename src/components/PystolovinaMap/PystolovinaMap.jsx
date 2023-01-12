import Void from "../../img/void.png";
import Scaffold from "../../img/scaffold.png";
import classes from "./PystolovinaMap.module.css";
import RandomButton from "../RadnomButon/RandomButton";

const tileMap = {
  0: Void,
  1: Scaffold,
};


export default function PystolovinaMap({ map, setMap, agentCoordinates }) {

  return (
    <div className={classes.main}>
      <RandomButton map={map} setMap={setMap} />
      <div className={classes.map}>
        {map.map((row, rowIndex) => {
          return (
            <div className={classes.row}>
              {row.map((tile, colIndex) => {
                return (
                  <img
                    src={tileMap[tile]}
                    alt={tile}
                    key={rowIndex + colIndex}
                    className={tile === 1 ? classes.scaffold : classes.void}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
