import React from 'react';
const { exec } = require("child_process");
const { ipcRenderer } = require("electron");

function Landing() {
  const runPythonScript = () => {
    console.log('imagine')
  };

  return (
    <div>
      <h1>Electron React Python Example</h1>
      <button onClick={runPythonScript}>Run Python Script</button>
    </div>
  );
}

export default Landing;