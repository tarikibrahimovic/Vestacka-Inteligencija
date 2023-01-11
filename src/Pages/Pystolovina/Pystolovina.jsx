import { useState } from "react";
import classes from "./Pystolovina.module.css";
import { AiFillSetting } from "react-icons/ai";
import Settings from "../../components/Settings/Settings";

export default function Pystolovina() {
  const [hiddenSidebar, setHiddenSidebar] = useState(true);
  const [teacerPlayer1, setTeacherPlayer1] = useState(null);
  const [teacerPlayer2, setTeacherPlayer2] = useState(null);
  const [teacerPlayer3, setTeacherPlayer3] = useState(null);
  const [userPlayer, setUserPlayer] = useState(null);
  const [studentPlayer, setStudentPlayer] = useState(null);
  const [studentPlayerDepth, setStudentPlayerDepth] = useState(null);
  const [studentPlayerTime, setStudentPlayerTime] = useState(null);
  const [mapRows, setMapRows] = useState(null);
  const [mapCols, setMapCols] = useState(null);
  const [teacherDepth1, setTeacherDepth1] = useState(null);
  const [teacherDepth2, setTeacherDepth2] = useState(null);
  const [teacherDepth3, setTeacherDepth3] = useState(null);
  const [teacherTime1, setTeacherTime1] = useState(null);
  const [teacherTime2, setTeacherTime2] = useState(null);
  const [teacherTime3, setTeacherTime3] = useState(null);

  const teacherHandler1 = (agent) => {
    setTeacherPlayer1(agent);
  };

  const teacherHandler2 = (agent) => {
    setTeacherPlayer2(agent);
  };

  const teacherHandler3 = (agent) => {
    setTeacherPlayer3(agent);
  };

  return (
    <>
      <Settings
        hiddenSidebar={hiddenSidebar}
        setHiddenSidebar={setHiddenSidebar}
        teacherPlayer1={teacerPlayer1}
        teacherPlayer2={teacerPlayer2}
        teacherPlayer3={teacerPlayer3}
        teacherHandler1={teacherHandler1}
        teacherHandler2={teacherHandler2}
        teacherHandler3={teacherHandler3}
        studentPlayer={studentPlayer}
        setStudentPlayer={setStudentPlayer}
        setMapRows={setMapRows}
        setMapCols={setMapCols}
        studentPlayerDepth={studentPlayerDepth}
        SetStudentPlayerDepth={setStudentPlayerDepth}
        studentPlayerTime={studentPlayerTime}
        setStudentPlayerTime={setStudentPlayerTime}
        userPlayer={userPlayer}
        setUserPlayer={setUserPlayer}
        setTeacherDepth1={setTeacherDepth1}
        setTeacherDepth2={setTeacherDepth2}
        setTeacherDepth3={setTeacherDepth3}
        setTeacherTime1={setTeacherTime1}
        setTeacherTime2={setTeacherTime2}
        setTeacherTime3={setTeacherTime3}
      />
      <div className={`${classes.main} ${!hiddenSidebar && classes.dark}`}>
        <h1>PYSTOLOVnaN</h1>
        <AiFillSetting
          className={classes.settings}
          onClick={() => setHiddenSidebar(!hiddenSidebar)}
        />
      </div>
    </>
  );
}
