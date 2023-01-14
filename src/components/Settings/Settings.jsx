import classes from "./Settings.module.css";
import DefaultAgent from "../../img/DefaultAgent.png";
import { MdDoNotDisturbAlt } from "react-icons/md";
import PlayerSettings from "../PlayerSettings/PlayerSettings";
import { AiOutlineClose } from "react-icons/ai";
import DefaultAgent1 from "../../img/DefaultAgent1.png";
import Student from "../../img/STUDENT.png";
import { useEffect } from "react";

export default function Settings({
  hiddenSidebar,
  setHiddenSidebar,
  setMapRows,
  mapRows,
  setMapCols,
  mapCols,
  map,
  setMap,
  Agents,
  setAgents,
}) {
  const studentAgentHandler = (tip) => {
    if (!Agents.some((agent) => agent.name === "Student")) {
      setAgents([
        ...Agents,
        {
          id: 2,
          name: "Student",
          tip: tip,
          img: Student,
          row: null,
          col: null,
          depth: 2,
          time: 20,
        },
      ]);
    } else {
      setAgents((agent) => {
        return agent.map((a) => {
          if (a.name === "Student") {
            return {
              ...a,
              tip: tip,
            };
          }
          return a;
        });
      });
    }
  };

  const teacherAgentHandler = (teacher, tip, img) => {
    if (!Agents.some((agent) => agent.name === teacher)) {
      setAgents([
        ...Agents,
        {
          id: 3,
          name: teacher,
          tip: tip,
          img: img,
          row: null,
          col: null,
          depth: 2,
          time: 20,
        },
      ]);
    } else {
      setAgents((agent) => {
        return agent.map((a) => {
          if (a.name === teacher) {
            return {
              ...a,
              tip: tip,
              img: img,
            };
          }
          return a;
        });
      });
    }
  };

  useEffect(() => {
    if (mapRows && mapCols) {
      const newMap = [];
      for (let i = 0; i < mapRows; i++) {
        newMap.push([]);
        for (let j = 0; j < mapCols; j++) {
          newMap[i].push(0);
        }
      }
      setMap(newMap);
    }
  }, [mapRows, mapCols]);

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
            selected={map.length}
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
            selected={map[0].length}
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
            !Agents.some(agent => agent.name === "User") && classes.selected
          }`}
          onClick={(e) => {
            let newAgents = Agents?.filter((agent) => agent.name !== "User");
            setAgents(newAgents);
          }}
        >
          <MdDoNotDisturbAlt className={classes.disturb} />
        </button>
        <button
          className={`${classes.agentButton} ${
            Agents.filter(agent => {return agent.name === "User"}).length === 1 && classes.selected
          }`}
          onClick={(e) => {
            if (!Agents.some((agent) => agent.name === "User")) {
              setAgents([
                ...Agents,
                {
                  id: 0,
                  name: "User",
                  img: DefaultAgent,
                  row: null,
                  col: null,
                  depth: null,
                  time: null,
                },
              ]);
            } else {
              setAgents((agent) => {
                return agent.map((a) => {
                  if (a.name === "User") {
                    return {
                      ...a,
                      img: DefaultAgent,
                    };
                  }
                  return a;
                });
              });
            }
          }}
        >
          <img
            src={DefaultAgent}
            alt="DefaultAgent"
            className={classes.agent}
          />
        </button>
        <button
          className={`${classes.agentButton} ${
            Agents.filter(agent => {return agent.name === "User"}).length === 2 && classes.selected
          }`}
          onClick={(e) => {
            if (!Agents.some((agent) => agent.name === "User")) {
              setAgents([
                ...Agents,
                {
                  id: 0,
                  name: "User",
                  img: DefaultAgent,
                  row: null,
                  col: null,
                  depth: null,
                  time: null,
                },
                {
                  id: 1,
                  name: "User",
                  img: DefaultAgent1,
                  row: null,
                  col: null,
                  depth: null,
                  time: null,
                },
              ]);
            } else {
              setAgents([
                ...Agents,
                {
                  id: 1,
                  name: "User",
                  img: DefaultAgent1,
                  row: null,
                  col: null,
                  depth: null,
                  time: null,
                },
              ]);
            }
          }}
        >
          <img
            src={DefaultAgent}
            alt="DefaultAgent"
            className={classes.agent}
          />
          <img
            src={DefaultAgent1}
            alt="DefaultAgent1"
            className={classes.agent}
          />
        </button>
      </div>
      <hr className={classes.hr} />
      <h4 className={classes.titles}>Student players: </h4>
      <div className={classes.imgContainer}>
        <img src={Student} alt="Teacher" />
      </div>
      <div className={classes.hiddenSidebarContent}>
        <button
          className={`${classes.agentButton} ${
            !Agents.some(agent => agent.name === "Student") && classes.selected
          }`}
          onClick={(e) => {
            setAgents(Agents.filter((agent) => agent.name !== "Student"));
          }}
        >
          <MdDoNotDisturbAlt className={classes.disturb} />
        </button>
        <button
          className={`${classes.agentButton} ${
            Agents.some(agent => agent.name === "Student" && agent.tip === "Minimax") && classes.selected
          }`}
          onClick={(e) => {
            studentAgentHandler("Minimax");
          }}
        >
          <b>Minimax</b>
        </button>
        <button
          className={`${classes.agentButton} ${
            Agents.some(agent => agent.name === "Student" && agent.tip === "AlphaBeta") && classes.selected
          }`}
          onClick={(e) => studentAgentHandler("AlphaBeta")}
        >
          <b>AlphaBeta</b>
        </button>
        <button
          className={`${classes.agentButton} ${
            Agents.some(agent => agent.name === "Student" && agent.tip === "Expectimax") && classes.selected
          }`}
          onClick={(e) => studentAgentHandler("Expectimax")}
        >
          <b>Expectimax</b>
        </button>
        <button
          className={`${classes.agentButton} ${
            Agents.some(agent => agent.name === "Student" && agent.tip === "Max^N") && classes.selected
          }`}
          onClick={(e) => studentAgentHandler("Max^N")}
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
            onChange={(e) => {
              if (e.target.value < 3) {
                setAgents((agent) => {
                  return agent.map((a) => {
                    if (a.name === "Student") {
                      return {
                        ...a,
                        depth: 3,
                      };
                    }
                    return a;
                  });
                });
              } else if (e.target.value > 10) {
                setAgents((agent) => {
                  return agent.map((a) => {
                    if (a.name === "Student") {
                      return {
                        ...a,
                        depth: 10,
                      };
                    }
                    return a;
                  });
                });
              } else {
                setAgents((agent) => {
                  return agent.map((a) => {
                    if (a.name === "Student") {
                      return {
                        ...a,
                        depth: e.target.value,
                      };
                    }
                    return a;
                  });
                });
              }
            }}
          />
        </div>
        <div className={classes.inputi}>
          <label htmlFor="time">Time:</label>
          <input
            type="number"
            id="time"
            className={classes.nums}
            name="time"
            onChange={(e) => {
              if (e.target.value < 1) {
                setAgents((agent) => {
                  return agent.map((a) => {
                    if (a.name === "Student") {
                      return {
                        ...a,
                        time: 1,
                      };
                    }
                    return a;
                  });
                });
              } else {
                setAgents((agent) => {
                  return agent.map((a) => {
                    if (a.name === "Student") {
                      return {
                        ...a,
                        time: e.target.value,
                      };
                    }
                    return a;
                  });
                });
              }
            }}
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
        teacherAgentHandler={teacherAgentHandler}
        name="Teacher1"
        setAgents={setAgents}
        Agents={Agents}
      />
      <PlayerSettings
        teacherAgentHandler={teacherAgentHandler}
        name="Teacher2"
        setAgents={setAgents}
        Agents={Agents}
      />
      <PlayerSettings
        teacherAgentHandler={teacherAgentHandler}
        name="Teacher3"
        setAgents={setAgents}
        Agents={Agents}
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
