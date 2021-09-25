import { Button, Dropdown } from 'antd';
import 'antd/dist/antd.css';
import { createContext, FC, useRef, useState } from 'react';
import './App.css';
import { Header } from './components';
import { CellGrid } from './components/game/cell-grid';
import { PatternMenu } from './components/menus';
import { Pattern } from './utils/patterns';

export const RunningContext = createContext(false);

const App: FC = () => {
  const [running, setRunning] = useState(false);
  const [drawMode, setDrawMode] = useState<Pattern>(Pattern.None);
  const menu = PatternMenu(setDrawMode);

  // make the value of running available in useCallback
  const runningRef = useRef(running);
  runningRef.current = running;

  return (
    <RunningContext.Provider value={running}>
      <Header>
        <Button
          type='primary'
          onClick={() => {
            setRunning(!running);
            if (!running) {
              // state update might not be done in time
              runningRef.current = true;
            }
          }}
        >
          {running ? 'Stop' : 'Start'}
        </Button>
        <Dropdown
          overlay={menu}
          trigger={['click']}>
          <Button>
            Patterns
          </Button>
        </Dropdown>
        {drawMode !== Pattern.None && <Button onClick={() => setDrawMode(Pattern.None)}>
          Clear Pattern
        </Button>}
      </Header>
      <CellGrid drawMode={drawMode} />
    </RunningContext.Provider>
  );
}

export default App;
