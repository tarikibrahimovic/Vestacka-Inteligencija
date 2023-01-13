import { MdDoNotDisturbAlt } from "react-icons/md";
import classes from "./PlayerSettings.module.css";
import Aki from "../../img/Aki.png";
import Jocke from "../../img/Jocke.png";
import Draza from "../../img/Draza.png";
import Bole from "../../img/Bole.png";

export default function PlayerSettings({
  teacherAgentHandler,
  setAgents,
  name,
  Agents,
}) {
  return (
    <>
      <div className={classes.hiddenSidebarContent}>
        <button
          className={`${classes.agentButton} ${
            !Agents.some((agent) => agent.name === name) && classes.selected
          }`}
          onClick={(e) => {
            setAgents((agent) => {
              return agent.filter((item) => item.name !== name);
            });
          }}
        >
          <MdDoNotDisturbAlt className={classes.disturb} />
        </button>
        <button
          className={`${classes.agentButton} ${
            Agents.some(
              (agent) => agent.name === name && agent.tip === "Aki"
            ) && classes.selected
          }`}
          onClick={(e) => teacherAgentHandler(name, "Aki", Aki)}
        >
          <b>Aki</b>
          <img src={Aki} alt="Aki" className={classes.agent} />
        </button>
        <button
          className={`${classes.agentButton} ${
            Agents.some(
              (agent) => agent.name === name && agent.tip === "Bole"
            ) && classes.selected
          }`}
          onClick={(e) => teacherAgentHandler(name, "Bole", Bole)}
        >
          <b>Bole</b>
          <img src={Bole} alt="Bole" className={classes.agent} />
        </button>
        <button
          className={`${classes.agentButton} ${
            Agents.some(
              (agent) => agent.name === name && agent.tip === "Draza"
            ) && classes.selected
          }`}
          onClick={(e) => teacherAgentHandler(name, "Draza", Draza)}
        >
          <b>Draza</b>
          <img src={Draza} alt="Draza" className={classes.agent} />
        </button>
        <button
          className={`${classes.agentButton} ${
            Agents.some(
              (agent) => agent.name === name && agent.tip === "Jocke"
            ) && classes.selected
          }`}
          onClick={(e) => teacherAgentHandler(name, "Jocke", Jocke)}
        >
          <b>Jocke</b>
          <img src={Jocke} alt="Jocke" className={classes.agent} />
        </button>
      </div>
      {Agents.some(
        (agent) =>
          agent.name === name &&
          (agent.tip === "Draza" || agent.tip === "Bole")
      ) && (
        <>
          <h5 className={classes.titles}>Algorithm Settings:</h5>
          <div className={classes.hiddenSidebarContent}>
            <div className={classes.inputi}>
              <label htmlFor="depth">Depth:</label>
              <input
                id="depth"
                type="number"
                onChange={(e) => {
                  setAgents((agent) => {
                    return agent?.map((agent) => {
                      if (agent.name === name) {
                        return { ...agent, depth: e.target.value };
                      }
                      return agent;
                    });
                  });
                }}
              />
            </div>
            <div className={classes.inputi}>
              <label htmlFor="depth">Time:</label>
              <input
                id="Time"
                type="number"
                onChange={(e) => {
                  setAgents((agent) => {
                    return agent?.map((agent) => {
                      if (agent.name === name) {
                        return { ...agent, time: e.target.value };
                      }
                      return agent;
                    });
                  });
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
