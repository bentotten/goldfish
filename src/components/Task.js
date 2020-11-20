import React, {useState} from 'react';
import "../styles/Task.css";

const Task = props => {
    const [task, setTask] = useState('hello')


    return (<div><p>{task}</p></div>)
}

/*
function Task({ task }) {
    const [task, setTask] = useState('hello')
    return (
      <div className="task">
        {task.text}
      </div>
    );
  };
*/

export default Task;