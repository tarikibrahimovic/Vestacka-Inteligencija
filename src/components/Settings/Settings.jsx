import classes from "./Settings.module.css";
import DefaultAgent from "../../img/DefaultAgent.png";
import { MdDoNotDisturbAlt } from "react-icons/md";
import PlayerSettings from "../PlayerSettings/PlayerSettings";
import { AiOutlineClose } from "react-icons/ai";

export default function Settings({
  hiddenSidebar,
  setHiddenSidebar,
  teacherHandler1,
  teacherHandler2,
  teacherHandler3,
  teacherPlayer1,
  teacherPlayer2,
  teacherPlayer3,
  studentPlayer,
  setStudentPlayer,
  setMapRows,
  setMapCols,
  setStudentPlayerDepth,
  setStudentPlayerTime,
  userPlayer,
  setUserPlayer,
  setTeacherDepth1,
  setTeacherDepth2,
  setTeacherDepth3,
  setTeacherTime1,
  setTeacherTime2,
  setTeacherTime3,
}) {
  return (
    <div className={hiddenSidebar ? classes.hiddenSidebar : classes.sidebar}>
      <p
        className={classes.closeP}
        onClick={(e) => setHiddenSidebar(!hiddenSidebar)}
      >
        <AiOutlineClose className={classes.closeIcon} />
      </p>
      <h3 className={classes.titles}>Edit map:</h3>
      <div className={classes.hiddenSidebarContent}>
        <div className={classes.inputi}>
          <label htmlFor="row">Rows:</label>
          <input
            type="number"
            id="row"
            className={classes.nums}
            name="row"
            min="3"
            max="10"
            placeholder="Enter rows"
            onChange={(e) => setMapRows(e.target.value)}
          />
        </div>
        <div className={classes.inputi}>
          <label htmlFor="col">Columns:</label>
          <input
            type="number"
            id="col"
            className={classes.nums}
            name="col"
            min="3"
            max="10"
            placeholder="Enter columns"
            onChange={(e) => setMapCols(e.target.value)}
          />
        </div>
      </div>
      <hr className={classes.hr} />
      <h3 className={classes.titles}>Player settings:</h3>
      <h4 className={classes.titles}>User players:</h4>
      <div className={classes.hiddenSidebarContent}>
        <button
          className={`${classes.agentButton} ${
            userPlayer === null && classes.selected
          }`}
          onClick={(e) => setUserPlayer(null)}
        >
          <MdDoNotDisturbAlt className={classes.disturb} />
        </button>
        <button
          className={`${classes.agentButton} ${
            userPlayer === 1 && classes.selected
          }`}
          onClick={(e) => setUserPlayer(1)}
        >
          <img
            src={DefaultAgent}
            alt="DefaultAgent"
            className={classes.agent}
          />
        </button>
        <button
          className={`${classes.agentButton} ${
            userPlayer === 2 && classes.selected
          }`}
          onClick={(e) => setUserPlayer(2)}
        >
          <img
            src={DefaultAgent}
            alt="DefaultAgent"
            className={classes.agent}
          />
          <img
            src={DefaultAgent}
            alt="DefaultAgent"
            className={classes.agent}
          />
        </button>
      </div>
      <hr className={classes.hr} />
      <h4 className={classes.titles}>Student players:</h4>
      <div className={classes.hiddenSidebarContent}>
        <button
          className={`${classes.agentButton} ${
            studentPlayer === null && classes.selected
          }`}
          onClick={(e) => setStudentPlayer(null)}
        >
          <MdDoNotDisturbAlt className={classes.disturb} />
        </button>
        <button
          className={`${classes.agentButton} ${
            studentPlayer === "Minimax" && classes.selected
          }`}
          onClick={(e) => setStudentPlayer("Minimax")}
        >
          <b>Minimax</b>
        </button>
        <button
          className={`${classes.agentButton} ${
            studentPlayer === "AlphaBeta" && classes.selected
          }`}
          onClick={(e) => setStudentPlayer("AlphaBeta")}
        >
          <b>AlphaBeta</b>
        </button>
        <button
          className={`${classes.agentButton} ${
            studentPlayer === "Expectimax" && classes.selected
          }`}
          onClick={(e) => setStudentPlayer("Expectimax")}
        >
          <b>Expectimax</b>
        </button>
        <button
          className={`${classes.agentButton} ${
            studentPlayer === "MaxN" && classes.selected
          }`}
          onClick={(e) => setStudentPlayer("MaxN")}
        >
          <b>Max N</b>
        </button>
      </div>
      <h5 className={classes.titles}>Algorithm settings:</h5>
      <div className={classes.hiddenSidebarContent}>
        <div className={classes.inputi}>
          <label htmlFor="depth">Depth:</label>
          <input
            type="number"
            id="depth"
            className={classes.nums}
            name="depth"
            onChange={(e) => setStudentPlayerDepth(e.target.value)}
          />
        </div>
        <div className={classes.inputi}>
          <label htmlFor="time">Time:</label>
          <input
            type="number"
            id="time"
            className={classes.nums}
            name="time"
            onChange={(e) => setStudentPlayerTime(e.target.value)}
          />
        </div>
      </div>
      <hr className={classes.hr} />
      <h4 className={classes.titles}>Teacher players:</h4>
      <div className={classes.info}>
        <i>Aki: Manhattan Distance</i>
        <i>Jocke: Random</i>
        <i>Draza: Alpha-Beta pruning</i>
        <i>Bole: MaxN</i>
      </div>
      <PlayerSettings
        teacherHandler={teacherHandler1}
        teacherPlayer={teacherPlayer1}
        setTeacherDepth={setTeacherDepth1}
        setTeacherTime={setTeacherTime1}
      />
      <PlayerSettings
        teacherHandler={teacherHandler2}
        teacherPlayer={teacherPlayer2}
        setTeacherDepth={setTeacherDepth2}
        setTeacherTime={setTeacherTime2}
      />
      <PlayerSettings
        teacherHandler={teacherHandler3}
        teacherPlayer={teacherPlayer3}
        setTeacherDepth={setTeacherDepth3}
        setTeacherTime={setTeacherTime3}
      />
      <hr className={classes.hr} />
      <div className={classes.hiddenSidebarContent}>
        <button
          className={classes.close}
          onClick={(e) => setHiddenSidebar(!hiddenSidebar)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
