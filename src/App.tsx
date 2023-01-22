import './App.css';
import { useState } from 'react';
import One from './webcam';
import Two from './webcamTwo';
import Three from './webcamThree';


function App() {
  const [state, setState] = useState("start");

  const AddSolution = (props: any) => {
    return (
      <button type='button' onClick={props.addSolution}>
        {props.text}
      </button>
    );
  };

  return (
    <div className='App'>
      <header className='App-header'>
        {state === "start" && (
          <div>
            <AddSolution
              text={"version 1"}
              addSolution={() => setState("version 1")}
            />
            <AddSolution
              text={"version 2"}
              addSolution={() => setState("version 2")}
            />
             <AddSolution
              text={"version 3"}
              addSolution={() => setState("version 3")}
            />
          </div>
        )}
        <main>
          {state === "version 1" && <One />}
          {state === "version 2" && <Two />}
          {state === "version 3" && <Three />}
        </main>


        {state !== "start" && (
          <div>
            <div id='outputText'>Output Text:</div>
            <div id='outputConstraintError'>Constraint Error:</div>
            <div id='outputFlipState'>Flip State:</div>
          </div>
        )}

        <AddSolution text={"reset"} addSolution={() => setState("start")} />
      </header>
    </div>
  );
}


export default App;
