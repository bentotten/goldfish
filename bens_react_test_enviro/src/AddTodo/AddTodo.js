import React from 'react';

class AddTodo extends React.Component {

    constructor() {
        super();
        this.state = {
            todo: ''
        };
    }

    render() {
        return(
        <div className='addTodoContainer'>
            <form onSubmit={(e) => this.submitTodo(e)}>
                <input onChange={(e) => this.updateInput(e)} type='text'></input>
                <button type='submit'>Add Task</button>
            </form>
        </div>);
    }

    updateInput = (e) => {
        this.setState({ todo: e.target.value});
        console.log(e);
    }

    submitTodo = (e) => {
        e.preventDefault();
        console.log('submit', this.state);
    }

}

export default AddTodo;