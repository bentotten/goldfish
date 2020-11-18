import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './styles/App.css';
import TaskList from './TaskList';

ReactDOM.render(
  <React.StrictMode>
    <div id="golfish-root">
      <div id="header-container">
        <h1>Goldfish</h1>
      </div>
      <div id="app-container">
        <App />
      </div>
      <div>
        <TaskList />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
