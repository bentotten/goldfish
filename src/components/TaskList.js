import React, {useState} from 'react';
import Task from './Task';
import "./styles/Task.css";

  function TaskList() {
    const [tasks, setTasks] = React.useState([
        { text: "Quad 1" },
        { text: "Quad 2" },
        { text: "Quad 3" },
        { text: "Quad 4"}
    ]);

    //const test = {'hello'};
  
    return (
        <div className="tasklist">
          <div className="task-list">
            {tasks.map((task, index) => (
              <Task />
            ))}
          </div>
        </div>
      );
    }
  
  export default TaskList;