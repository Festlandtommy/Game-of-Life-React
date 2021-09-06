import { produce } from "immer";
import { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { RunningContext } from "../../App";
import { draw } from "../../utils";
import { operations } from '../../utils/operations';
import { Pattern } from "../../utils/patterns";

export const ROWS = 50;
export const COLUMNS = 50;

export interface CellGridProps {
  drawMode: Pattern;
}

const CellGrid: FC<CellGridProps> = ({ drawMode }) => {
  const [grid, setGrid] = useState<any[][]>(Array.from({ length: ROWS }).map(() => Array.from({ length: COLUMNS }).fill(0)))
  const [iterationTime, setIterationTime] = useState(100);
  const running = useContext(RunningContext);

  // make the value of running available in useCallback
  const runningRef = useRef(running);
  runningRef.current = running;

  const simulate = useCallback(() => {
    if (!runningRef.current) return;

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
    // setIteration((before: number) => before + 1);
    setTimeout(simulate, iterationTime);
  }, [iterationTime]);

  useEffect(() => {
    if (running) simulate();
  }, [running]);


  return (

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
  )
}

export { CellGrid };