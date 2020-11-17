import React, { Component } from 'react';
import Card from "./card-stand-in";
 

class Todo extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        List: [[],[],[],[]],
      }
    }
 
  render() {  
    return (
      <div className="Todo">
        <header className="Todo-Header">
          <h1> Master Todo List</h1>
        </header>
        <body>
          <button className="button" onClick={addTask()}>
            Add Task
          </button>
        </body>
      </div>
    );

    var addTask = () => {

    }

  }
}


export default Todo;