import { useEffect, useState } from "react";
import classes from "./Pytanja.module.css";
import Pesak from "../../img/dune.png";
import Put from "../../img/road.png";
import Kamen from "../../img/stone.png";
import Trail from "../../img/trail.png";
import Voda from "../../img/water.png";
import Zemlja from "../../img/mud.png";
import Trava from "../../img/grass.png";
import Cilj from "../../img/x.png";
import Aki from "../../img/Aki.png";
import Bole from "../../img/Bole.png";
import Draza from "../../img/Draza.png";
import Jocke from "../../img/Jocke.png";
import { NotificationManager } from "react-notifications";
import Player from "../../components/Player/Player";
import Finish from "../../components/Cilj/Cilj";

const tileMap = {
  p: Pesak,
  r: Put,
  k: Kamen,
  v: Voda,
  z: Zemlja,
  t: Trava,
};

const agentMap = {
  Draza: Draza,
  Aki: Aki,
  Bole: Bole,
  Jocke: Jocke,
};

function Pytanja() {
  const [tiles2, setTiles2] = useState([
    ["p", "p", "r", "r", "z", "z", "z", "z", "z"],
    ["r", "k", "v", "z", "z", "z", "z", "z", "z"],
    ["t", "t", "t", "t", "z", "z", "z", "z", "z"],
    ["z", "z", "v", "v", "v", "z", "z", "z", "z"],
    ["z", "z", "v", "v", "v", "z", "z", "z", "z"],
    ["z", "z", "v", "v", "v", "z", "z", "z", "z"],
    ["z", "z", "v", "v", "v", "z", "z", "z", "z"],
    ["z", "z", "v", "v", "v", "z", "z", "z", "z"],
    ["z", "z", "v", "v", "v", "z", "z", "z", "z"],
  ]);
  const [dragingCilj, setDragingCilj] = useState(false);
  const [width, setWidth] = useState(tiles2[0].length);
  const [height, setHeight] = useState(tiles2.length);

  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const [agent, setAgent] = useState(Draza);
  const [agentKey, setAgentKey] = useState("Draza");

  const [ciljX, setCiljX] = useState(1);
  const [ciljY, setCiljY] = useState(0);

  const [editorMode, setEditorMode] = useState(true);
  const [selectedTile, setSelectedTile] = useState({ i: null, j: null });
  const [polje, setPolje] = useState(null);

  const [path, setPath] = useState([]);
  const [rows, setRows] = useState();
  const [column, setColumn] = useState();
  let size = 30;
  let pom;

  function Pytanja() {
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        finishPosition: { x: ciljX, y: ciljY },
        map: tiles2,
        player: { tip: agentKey, x: playerX, y: playerY },
      }),
    };
    // const baseUrl = "http://127.0.0.1:8000";
    const baseUrl = "https://tarik2508.pythonanywhere.com"
    fetch(`${baseUrl}/get-moves`, requestOptions)
      .then((e) => {
        return e.json();
      })
      .then((res) => {
        setPath(res.res);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    if (editorMode) return;
    let idx = 0;
    const interval = setInterval(() => {
      if (path[idx]) {
        const { x, y } = path[idx];
        idx++;
        setPlayerX(x);
        setPlayerY(y);
        setTimeout(() => {
          setPath((p) => p.slice(1));
        }, 100);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [path]);

  function selectTile(i, j) {
    if (!editorMode) return;
    if (selectedTile.i === i && selectedTile.j === j) {
      setSelectedTile({ i: null, j: null });
    } else {
      setSelectedTile({ i: i, j: j });
    }
  }

  function changeAgent(ag) {
    setPolje(null);
    if (agentMap[ag] === agent) {
      setAgent(Draza);
    } else {
      setAgent(agentMap[ag]);
    }
  }

  function selectPolje(p) {
    if (polje === p) {
      setPolje(null);
    } else {
      setPolje(p);
    }
  }

  function changeTile() {
    if (polje !== null) {
      setTiles2((prev) => {
        return prev.map((el, i) => {
          return el.map((t, j) =>
            selectedTile.i === i && selectedTile.j === j ? polje : t
          );
        });
      });
    }
  }

  useEffect(() => {
    changeTile();
  }, [selectedTile]);

  return (
    <div className={classes.container}>
      <div className={classes.editor}>
        <div className={classes.forma}>
          <h2 className={classes.titles}>Edit map:</h2>
          <div className={classes.edits}>
            <div className={classes.inputi}>
              <label htmlFor="row">Enter number of rows:</label>
              <input
                type="number"
                placeholder="Enter rows"
                id="row"
                min="3"
                max="10"
                className={classes.numInput}
                onChange={(e) => {
                  console.log(e.target.value);
                  if (e.target.value > 10) setRows(10);
                  else if (e.target.value === null) {
                    setRows(tiles2.length);
                  } else if (e.target.value < 3) setRows(3);
                  else setRows(e.target.value);
                }}
              />
            </div>
            <div className={classes.inputi}>
              <label htmlFor="col">Enter number of columns:</label>
              <input
                type="number"
                className={classes.numInput}
                placeholder="Enter colums"
                id="col"
                min="3"
                max="10"
                onChange={(e) => {
                  if (e.target.value > 10) setColumn(10);
                  else if (e.target.value === null) {
                    setColumn(tiles2[0].length);
                  } else if (e.target.value < 3) setColumn(3);
                  else setColumn(e.target.value);
                }}
              />
            </div>
          </div>
          <p className={classes.guide}>
            <b>
              <i>Map max: 10x10</i>
            </b>
            <b>
              <i>Map min: 3x3</i>
            </b>
          </p>
          <button
            className={classes.edit}
            onClick={(e) => {
              pom = tiles2;
              if (rows > pom.length) {
                let t = pom.length;
                for (let i = 0; i < rows - t; i++) {
                  let niz = [];
                  for (let j = 0; j < pom[0].length; j++) {
                    niz.push("n");
                  }
                  pom.push(niz);
                }
              } else if (rows < pom.length) {
                pom = pom.slice(0, pom.length - (pom.length - rows));
              }

              if (column > pom[0].length) {
                let t = pom[0].length;
                for (let i = 0; i < pom.length; i++) {
                  for (let j = 0; j < column - t; j++) {
                    pom[i].push("n");
                  }
                }
              } else if (column < pom[0].length) {
                for (let i = 0; i < pom.length; i++) {
                  pom[i] = pom[i].slice(
                    0,
                    pom[i].length - (pom[i].length - column)
                  );
                }
              }

              setHeight(pom.length);
              setWidth(pom[0].length);
              setTiles2(pom);
              setCiljX(1);
              setCiljY(0);
              setPlayerX(0);
              setPlayerY(0);
              setEditorMode(true);
              pom = null;
            }}
          >
            EDIT
          </button>
        </div>
        <div className={classes["opt-container"]}>
          <h3 className={classes.titles}>TILES:</h3>
          <div className={classes.agents}>
            {Object.keys(tileMap).map((color) => (
              <div className={classes.optOmotac}>
                <img
                  onClick={() => {
                    selectPolje(color);
                  }}
                  className={`${classes.option} ${
                    polje === color && classes.poljeSelected
                  }`}
                  src={tileMap[color]}
                ></img>
                <p>
                  <i>{color}</i>
                </p>
              </div>
            ))}
          </div>
          <h3 className={classes.titles}>AGENTS:</h3>
          <div className={classes.agents}>
            {Object.keys(agentMap).map((ag) => (
              <div className={classes.optOmotac}>
                <img
                  onClick={() => {
                    changeAgent(ag);
                    setDragingCilj(false);
                    setAgentKey(ag);
                  }}
                  className={`${classes.option} ${
                    agent === agentMap[ag] && classes.poljeSelected
                  }`}
                  src={agentMap[ag]}
                ></img>
                <p>
                  <i>{ag}</i>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className={classes.start}
        onClick={(e) => {
          e.preventDefault();
          let t = 0;
          for (let i = 0; i < tiles2.length; i++) {
            for (let j = 0; j < tiles2[i].length; j++) {
              if (tiles2[i][j] === "n") {
                t = 1;
                break;
              }
            }
          }
          if (t === 0) {
            Pytanja();
            setEditorMode((e) => !e);
          } else {
            NotificationManager.error("", "Fill all fields");
          }
        }}
      >
        START
      </button>
      <div className={classes.svgOkvir}>
        <svg
          viewBox={`${editorMode ? "-1" : "0"} ${editorMode ? "-1" : "0"} ${
            width * size
          } ${height * size}`}
        >
          {tiles2.map((el, i) => {
            return el.map((t, j) => {
              if (t !== "n")
                return (
                  <image
                    className={
                      editorMode &&
                      classes.tile +
                        (selectedTile.i === i && selectedTile.j === j
                          ? ` ${classes.selected}`
                          : "")
                    }
                    href={tileMap[t]}
                    x={j * size}
                    y={i * size}
                    width={`${
                      !editorMode
                        ? (width * size) / width
                        : (width * size) / width - 1.7
                    }`}
                    height={`${
                      !editorMode
                        ? (height * size) / height
                        : (height * size) / height - 1.7
                    }`}
                    onClick={() => {
                      selectTile(i, j);
                      changeTile();
                    }}
                    onDragEnter={(e) => {
                      if (editorMode) {
                        if (!dragingCilj) {
                          setPlayerX(j);
                          setPlayerY(i);
                        } else {
                          setCiljX(j);
                          setCiljY(i);
                        }
                      }
                    }}
                  />
                );
              else
                return (
                  <rect
                    className={
                      (editorMode && classes.tile) + ` ${classes.empty}`
                    }
                    x={j * size}
                    y={i * size}
                    width={`${
                      !editorMode
                        ? (width * size) / width
                        : (width * size) / width - 1.7
                    }`}
                    height={`${
                      !editorMode
                        ? (height * size) / height
                        : (height * size) / height - 1.7
                    }`}
                    onClick={() => {
                      selectTile(i, j);
                      changeTile();
                    }}
                  />
                );
            });
          })}

          {editorMode ||
            path.map((p) => (
              <image
                href={Trail}
                className={classes.trail}
                x={(p.x * width * size) / width + 60 / width / 2}
                y={(p.y * height * size) / height + 60 / height / 2}
              />
            ))}
          <Player
            karakter={agent}
            width={width}
            size={size}
            height={height}
            playerX={playerX}
            playerY={playerY}
            klasa={classes.player}
            setDragingCilj={setDragingCilj}
          />
          <Finish
            karakter={Cilj}
            width={width}
            size={size}
            height={height}
            ciljX={ciljX}
            ciljY={ciljY}
            klasa={classes.cilj}
            hidden={classes.hidden}
            editorMode={editorMode}
            setDragingCilj={setDragingCilj}
          />
        </svg>
      </div>
    </div>
  );
}

export default Pytanja;
