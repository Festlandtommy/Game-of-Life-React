import { FC, useCallback, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { produce } from 'immer'

const ROWS = 25;
const COLUMNS = 25;

// Moore neighborhood
const operations = [
  [-1, -1],  // NW
  [-1, 0],   // N
  [-1, 1],   // NE
  [0, 1],    // E
  [1, 1],    // SE
  [1, 0],    // S
  [1, -1],   // SW
  [0, -1],   // W
];

const App: FC = () => {
  // const [grid, setGrid] = useState<any[][]>(Array.from({ length: ROWS }).map(() => Array.from({ length: COLUMNS }).fill(0)))
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
      rows.push(Array.from(Array(COLUMNS), () => 0));
    }
    return rows;
  });

  const [running, setRunning] = useState(false);

  // make the value of running available in useCallback
  const runningRef = useRef(running);
  runningRef.current = running;

  const run = useCallback(() => {
    console.log(runningRef.current);
    if (!runningRef.current) return;

    // simulate
    setGrid((grid) => produce(grid, gridCopy => {
      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLUMNS; j++) {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;

            // check bounds
            if (newI >= 0 && newI < ROWS && newJ >= 0 && newJ < COLUMNS) {
              neighbors += grid[newI][newJ];
            }

            // game of life rules
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (grid[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          })
        }
      }
    }));

    setTimeout(run, 3100);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            // state update might not be done in time
            runningRef.current = true;
            run();
          }
        }}
      >
        {running ? 'stop' : 'start'}
      </button>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLUMNS}, 20px)`
      }}>{grid.map((rows, rowIndex) =>
        rows.map((col, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => {
              // we dont want to mutate, so we produce a copy
              const newGrid = produce(grid, gridCopy => {
                gridCopy[rowIndex][colIndex] = gridCopy[rowIndex][colIndex] ? 0 : 1;
              });
              setGrid(newGrid);
            }}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[rowIndex][colIndex] ? "yellow" : undefined,
              border: "solid 1px black"
            }} />
        )))}
      </div>
    </>
  );
}

export default App;
