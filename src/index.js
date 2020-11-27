import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';



ReactDOM.render(
  <React.StrictMode>
    <div id="golfish-root">
        <App />
        <h1>HELLO WORLD</h1>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
