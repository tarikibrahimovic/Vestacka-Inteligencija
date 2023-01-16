import { NotificationManager } from "react-notifications";
import classes from "./RandomButton.module.css";

export default function RandomButton({
  map,
  setMap,
  setLostAgents,
  setAgents,
  isRunning,
}) {
  const randomMap = () => {
    if (isRunning) {
      NotificationManager.error("You can't do that");
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
    const newMap = map.map((row) => {
      return row.map((tile) => {
        let random = Math.ceil((Math.random() + 0.3) * 2);
        if (random >= 2) {
          return 1;
        } else {
          return 0;
        }
      });
    });
    setMap(newMap);
  };

  return (
    <button onClick={randomMap} className={classes.random}>
      Random
    </button>
  );
}
