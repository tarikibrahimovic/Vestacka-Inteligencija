import { MdDoNotDisturbAlt } from "react-icons/md";
import classes from "./PlayerSettings.module.css";
import Aki from "../../img/Aki.png";
import Jocke from "../../img/Jocke.png";
import Draza from "../../img/Draza.png";
import Bole from "../../img/Bole.png";

export default function PlayerSettings({ teacherHandler, teacherPlayer, setTeacherDepth, setTeacherTime }) {
  return (
    <>
      <div className={classes.hiddenSidebarContent}>
        <button
          className={`${classes.agentButton} ${
            teacherPlayer === null && classes.selected
          }`}
          onClick={(e) => teacherHandler(null)}
        >
          <MdDoNotDisturbAlt className={classes.disturb} />
        </button>
        <button
          className={`${classes.agentButton} ${
            teacherPlayer === "Aki" && classes.selected
          }`}
          onClick={(e) => teacherHandler("Aki")}
        >
          <b>Aki</b>
          <img src={Aki} alt="Aki" className={classes.agent} />
        </button>
        <button
          className={`${classes.agentButton} ${
            teacherPlayer === "Bole" && classes.selected
          }`}
          onClick={(e) => teacherHandler("Bole")}
        >
          <b>Bole</b>
          <img src={Bole} alt="Bole" className={classes.agent} />
        </button>
        <button
          className={`${classes.agentButton} ${
            teacherPlayer === "Draza" && classes.selected
          }`}
          onClick={(e) => teacherHandler("Draza")}
        >
          <b>Draza</b>
          <img src={Draza} alt="Draza" className={classes.agent} />
        </button>
        <button
          className={`${classes.agentButton} ${
            teacherPlayer === "Jocke" && classes.selected
          }`}
          onClick={(e) => teacherHandler("Jocke")}
        >
          <b>Jocke</b>
          <img src={Jocke} alt="Jocke" className={classes.agent} />
        </button>
      </div>
      {(teacherPlayer === "Draza" || teacherPlayer === "Bole") && (
        <>
          <h5 className={classes.titles}>Algorithm Settings:</h5>
          <div className={classes.hiddenSidebarContent}>
            <div className={classes.inputi}>
              <label htmlFor="depth">Depth:</label>
              <input id="depth" type="number" onChange={e => setTeacherDepth(e.target.value)}/>
            </div>
            <div className={classes.inputi}>
              <label htmlFor="depth">Time:</label>
              <input id="Time" type="number" onChange={e => setTeacherTime(e.target.value)}/>
            </div>
          </div>
        </>
      )}
    </>
  );
}
