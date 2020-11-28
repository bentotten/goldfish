//This app created by Tyd Hashimoto and Ben Totten
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import spinup from './Server';

/* Spinup uses the Google Compute API to check if there is already a server up with this program on it. If there is, it knows that its the version running on that
   vm and to proceed with the render. Because of the asynchronous nature of this, we were unable to get this to function properly and have removed it, but the
   feature can be accessed from the command line by going to the src directory and typing 'node Server.js'

   async function startVM() {
      spinup()
   }
*/

ReactDOM.render(
  <React.StrictMode>
    <div id="golfish-root">
        <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
