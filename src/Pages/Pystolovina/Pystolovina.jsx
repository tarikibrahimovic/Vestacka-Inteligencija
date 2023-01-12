import { useState } from "react";
import classes from "./Pystolovina.module.css";
import { AiFillSetting } from "react-icons/ai";
import Settings from "../../components/Settings/Settings";
import PystolovinaMap from "../../components/PystolovinaMap/PystolovinaMap";
import { NotificationManager } from "react-notifications";

export default function Pystolovina() {
  const [hiddenSidebar, setHiddenSidebar] = useState(true);
  const [teacerPlayer1, setTeacherPlayer1] = useState(null);
  const [teacerPlayer2, setTeacherPlayer2] = useState(null);
  const [teacerPlayer3, setTeacherPlayer3] = useState(null);
  const [userPlayer, setUserPlayer] = useState(null);
  const [studentPlayer, setStudentPlayer] = useState(null);
  const [studentPlayerDepth, setStudentPlayerDepth] = useState(null);
  const [studentPlayerTime, setStudentPlayerTime] = useState(null);
  const [teacherDepth1, setTeacherDepth1] = useState(3);
  const [teacherDepth2, setTeacherDepth2] = useState(3);
  const [teacherDepth3, setTeacherDepth3] = useState(3);
  const [teacherTime1, setTeacherTime1] = useState(10);
  const [teacherTime2, setTeacherTime2] = useState(10);
  const [teacherTime3, setTeacherTime3] = useState(10);
  const [teacher1Coordinates, setTeacher1Coordinates] = useState({});
  const [teacher2Coordinates, setTeacher2Coordinates] = useState({});
  const [teacher3Coordinates, setTeacher3Coordinates] = useState({});
  const [userCoordinates, setUserCoordinates] = useState({});
  const [studentCoordinates, setStudentCoordinates] = useState({});
  const [Agents, setAgents] = useState([
    {
      id: 1,
      name: "Teacher1",
      row: null,
      img: null,
      col: null,
      depth: null,
      time: null,
    },
    {
      id: 4,
      name: "User",
      row: null,
      img: null,
      col: null,
      depth: null,
      time: null,
    },
    {
      id: 5,
      name: "Student",
      row: null,
      img: null,
      col: null,
      depth: null,
      time: null,
    },
  ]);
  const [mapRows, setMapRows] = useState(null);
  const [mapCols, setMapCols] = useState(null);
  const [map, setMap] = useState([
    [1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0],
  ]);

  const placeAgents = () => {
    let availableCoordinates = [];
    map.map((row, rowIndex) => {
      row.map((column, columnIndex) => {
        if (column === 1) {
          availableCoordinates.push({ row: rowIndex, column: columnIndex });
        }
      });
    });

    if (availableCoordinates.length < 5) {
      NotificationManager.error("Not enough available tiles!", 3000);
    }

    if (teacerPlayer1) {
      let random = Math.floor(Math.random() * availableCoordinates.length);
      let coordinates = availableCoordinates[random];
      setTeacher1Coordinates(coordinates);
      availableCoordinates.splice(random, 1);
    }
    if (teacerPlayer2) {
      let random = Math.floor(Math.random() * availableCoordinates.length);
      let coordinates = availableCoordinates[random];
      setTeacher2Coordinates(coordinates);
      availableCoordinates.splice(random, 1);
    }
    if (teacerPlayer3) {
      let random = Math.floor(Math.random() * availableCoordinates.length);
      let coordinates = availableCoordinates[random];
      setTeacher3Coordinates(coordinates);
      availableCoordinates.splice(random, 1);
    }
    if (userPlayer) {
      let random = Math.floor(Math.random() * availableCoordinates.length);
      let coordinates = availableCoordinates[random];
      setUserCoordinates(coordinates);
      availableCoordinates.splice(random, 1);
    }
    if (studentPlayer) {
      let random = Math.floor(Math.random() * availableCoordinates.length);
      let coordinates = availableCoordinates[random];
      setStudentCoordinates(coordinates);
      availableCoordinates.splice(random, 1);
    }
  };

  const AgentCoordinates = {
    teacher1Coordinates: teacher1Coordinates,
    teacher2Coordinates: teacher2Coordinates,
    teacher3Coordinates: teacher3Coordinates,
    userCoordinates: userCoordinates,
    studentCoordinates: studentCoordinates,
    teacher1: teacerPlayer1,
    teacher2: teacerPlayer2,
    teacher3: teacerPlayer3,
    user: userPlayer,
    student: studentPlayer,
  };

  const teacherHandler1 = (agent) => {
    setTeacherPlayer1(agent);
  };

  const teacherHandler2 = (agent) => {
    setTeacherPlayer2(agent);
  };

  const teacherHandler3 = (agent) => {
    setTeacherPlayer3(agent);
  };

  console.log(
    teacher1Coordinates,
    teacher2Coordinates,
    teacher3Coordinates,
    userCoordinates,
    studentCoordinates
  );

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
        setStudentPlayerDepth={setStudentPlayerDepth}
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
        map={map}
        setMap={setMap}
        mapRows={mapRows}
        mapCols={mapCols}
      />
      <div className={`${classes.main} ${!hiddenSidebar && classes.dark}`}>
        <h1>PYSTOLOVnaN</h1>
        <AiFillSetting
          className={classes.settings}
          onClick={() => setHiddenSidebar(!hiddenSidebar)}
        />
        <PystolovinaMap
          map={map}
          setMap={setMap}
          agentCoordinates={AgentCoordinates}
        />
        <button onClick={placeAgents}>PLACE AGENTS</button>
      </div>
    </>
  );
}
