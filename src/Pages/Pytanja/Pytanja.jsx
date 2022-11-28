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
  const [width, setWidth] = useState(tiles2[0].length);
  const [height, setHeight] = useState(tiles2.length);

  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(0);

  const [editorMode, setEditorMode] = useState(true);
  const [selectedTile, setSelectedTile] = useState(null);

  const [path, setPath] = useState([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 3, y: 3 },
  ]);

  const [rows, setRows] = useState();
  const [column, setColumn] = useState();
  let size = 30;
  let pom;

  useEffect(() => {
    if (editorMode) return;
    let idx = 0;
    const interval = setInterval(() => {
      const { x, y } = path[idx];
      setPlayerX(x);
      setPlayerY(y);
      idx++;
      setTimeout(() => {
        setPath((p) => p.slice(1));
      }, 500);

      if (idx === path.length) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [editorMode]);

  function selectTile(idx) {
    if (!editorMode) return;
    if (selectedTile === idx) {
      setSelectedTile(null);
    } else {
      setSelectedTile(idx);
    }
  }

  function changeTile(color) {
    if (!selectTile) return;

    // setTiles(tiles.map((t, idx) => (selectedTile === idx ? color : t)));
  }

  return (
    <div className={classes.container}>
      <div className={classes.forma}>
        <h2>Edit map</h2>
        <div className={classes.edits}>
          <div className={classes.inputi}>
            <label htmlFor="row">Enter number of rows:</label>
            <input
              type="number"
              placeholder="Enter rows"
              id="row"
              min="1"
              max="10"
              onChange={(e) => {
                console.log(e.target.value);
                if (e.target.value > 10) setRows(10);
                else if (e.target.value === null) {
                  setRows(tiles2.length);
                } else setRows(e.target.value);
              }}
            />
          </div>
          <div className={classes.inputi}>
            <label htmlFor="col">Enter number of columns:</label>
            <input
              type="number"
              placeholder="Enter colums"
              id="col"
              min="1"
              max="10"
              onChange={(e) => {
                if (e.target.value > 10) setColumn(10);
                else if (e.target.value === null) {
                  setColumn(tiles2[0].length);
                } else setColumn(e.target.value);
              }}
            />
          </div>
        </div>
        <p>
          {" "}
          <b>
            {" "}
            <i>Map max: 10x10</i>{" "}
          </b>{" "}
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
            pom = null;
          }}
        >
          EDIT
        </button>
      </div>
      <div className={classes["opt-container"]}>
        {Object.keys(tileMap).map((color) => (
          <img
            onClick={() => changeTile(color)}
            className={classes.option}
            src={tileMap[color]}
          ></img>
        ))}
      </div>
      <div className="">
        {Object.keys(agentMap).map((agent) => (
          <img
            onClick={() => changeTile(agent)}
            className={classes.option}
            src={agentMap[agent]}
          ></img>
        ))}
      </div>
      <button
        className={classes.edit}
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
          if (t === 0) setEditorMode((e) => !e);
          else {
            NotificationManager.error("", "Fill all fields");
          }
        }}
      >
        START
      </button>
      <div className={classes.svgOkvir}>
        <svg viewBox={`0 0 ${width * size} ${height * size}`}>
          {tiles2.map((el, idx) => {
            return el.map((t, i) => {
              if (t !== "n")
                return (
                  <image
                    className={
                      (editorMode && classes.tile) +
                      (selectedTile === idx ? ` ${classes.selected}` : "")
                    }
                    href={tileMap[t]}
                    x={i * size}
                    y={idx * size}
                    width={(width * size) / width}
                    height={(height * size) / height}
                    onClick={() => selectTile(idx)}
                  />
                );
              else
                return (
                  <rect
                    className={
                      (editorMode && classes.tile) + ` ${classes.empty}`
                    }
                    x={i * size}
                    y={idx * size}
                    width={(width * size) / width}
                    height={(height * size) / height}
                  />
                );
            });
          })}

          {editorMode ||
            path.map((p) => (
              <image
                href={Trail}
                className={classes.trail}
                x={(p.x * width * size) / width + size / width / 2}
                y={(p.y * height * size) / height + size / height / 2}
              />
            ))}

          <image
            className={classes.player}
            style={{
              transform: `translate(${(playerX * width * size) / width}px, ${
                (playerY * height * size) / height
              }px)`,
            }}
            href={Draza}
            cx={(width * size) / width / 2}
            cy={(height * size) / height / 2}
          />
          <image
            className={classes.cilj}
            href={Cilj}
            cx={(width * size) / width / 2}
            cy={(height * size) / height / 2}
          />
        </svg>
      </div>
    </div>
  );
}

export default Pytanja;
