import React, {useState} from 'react';
import "../styles/task.css";

/*const Task = props => {
    const [text, setText] = useState('hello')


    return (<div><p>{text}</p></div>)
}*/

function Task({ task }) {
    return (
      <div className="task">
        {task.text}
      </div>
    );
  };

export default Task;