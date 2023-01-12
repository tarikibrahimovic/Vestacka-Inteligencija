import classes from "./RandomButton.module.css";

export default function RandomButton({ map, setMap }) {
    
  const randomMap = () => {
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
