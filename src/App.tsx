import { FC, useCallback, useRef, useState } from 'react';
import { Button, Dropdown } from 'antd';
import './App.css';
import 'antd/dist/antd.css';
import { produce } from 'immer'
import { Header } from './components'
import { PatternMenu } from './components/menus'
import { draw } from './utils'

const ROWS = 50;
const COLUMNS = 50;

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

// patterns
export enum Pattern {
  // still
  None = 'None',
  Block = 'Block',
  Beehive = 'Beehive',
  Loaf = 'Loaf',
  Boat = 'Boat',
  Tub = 'Tub',
  // osci
  Blinker = 'Blinker',
  Toad = 'Toad',
  Beacon = 'Beacon',
  // ships
  Glider = 'Glider',
  LWSS = 'LWSS'
}

const App: FC = () => {
  const [grid, setGrid] = useState<any[][]>(Array.from({ length: ROWS }).map(() => Array.from({ length: COLUMNS }).fill(0)))
  const [running, setRunning] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [iterationTime, setIterationTime] = useState(100);
  const [drawMode, setDrawMode] = useState<Pattern>(Pattern.None);
  const myMenu = PatternMenu(setDrawMode);

  // make the value of running available in useCallback
  const runningRef = useRef(running);
  runningRef.current = running;

  const run = useCallback(() => {
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
          })


          // game of life rules
          if (neighbors < 2 || neighbors > 3) {
            gridCopy[i][j] = 0;
          } else if (grid[i][j] === 0 && neighbors === 3) {
            gridCopy[i][j] = 1;
          }
        }
      }
    }));
    setIteration((before) => before + 1);
    setTimeout(run, iterationTime);
  }, [iterationTime]);

  return (
    <>
      <Header running={running} iteration={iteration}>
        <Button
          type='primary'
          onClick={() => {
            console.log('click')
            setRunning(!running);
            if (!running) {
              // state update might not be done in time
              runningRef.current = true;
              run();
            }
          }}
        >
          {running ? 'Stop' : 'Start'}
        </Button>
        <Dropdown
          overlay={myMenu}
          trigger={['click']}>
          <Button>
            Patterns
          </Button>
        </Dropdown>
        {drawMode !== Pattern.None && <Button onClick={() => setDrawMode(Pattern.None)}>
          Clear Pattern
        </Button>}
      </Header>
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
                draw(gridCopy, [rowIndex, colIndex], drawMode);
              });
              setGrid(newGrid);
            }}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[rowIndex][colIndex] ? "black" : undefined,
              border: "solid 1px grey"
            }} />
        )))}
      </div>
    </>
  );
}

export default App;
