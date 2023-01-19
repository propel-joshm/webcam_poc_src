import './App.css';
import WebcamVideo from './webcam';


function App() {

  const height = 480;
  const width = 480;


  return (
    <div className="App">
      <header className="App-header">
        <WebcamVideo height={height} width={width}></WebcamVideo>
        {/* <video id="webcamVideo" height={constraints.height} width={constraints.width} autoPlay muted playsInline ></video> */}
        <div id="outputText"></div>
        <div id="outputConstraintError"></div>
        <div id="outputFlipState"></div>
      </header>
    </div>
  );
}

export default App;
