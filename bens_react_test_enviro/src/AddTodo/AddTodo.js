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
                <input id='addTodoInput' onChange={(e) => this.updateInput(e)} type='text'></input>
                <button type='submit'>Add Task</button>
            </form>
        </div>);
    }

    updateInput = (e) => {
        this.setState({ todo: e.target.value});
    }

    submitTodo = (e) => {
        e.preventDefault();
        this.props.addTodoFn(this.state.todo);
        document.getElementById('addTodoInput').value = '';
    }

}

export default AddTodo;