import React from 'react';
import './App.css';
import TodoList from './TodoList/TodoList';
import TodoItem from './TodoItem/TodoItem';
import AddTodo from './AddTodo/AddTodo';

// Todo list render
class App extends React.Component {

    // construct parents construct, assign object 'state'
    constructor() {
        super();    // Parent constructor

        // Make it rerender any time state gets updated
        this.state = {
            todos: []   // Prototype
        };
    }


    // Render it
    render() {
        return(
            <div>
                <AddTodo addTodoFn={this.addTodo}></AddTodo>
                <TodoList todos={this.state.todos}></TodoList>
            </div>
        );
    }

    // See if theres anything in local storage about to-dos
    componentDidMount = () => {
        const todos = localStorage.getItem('todos');
        if(todos) {
            console.log('Has to-dos', todos);
            const savedTodos = JSON.parse(todos);   // Saves into json
            this.setState({ todos: savedTodos});    // Update state
        } else {
            console.log('No to-dos');
        }
    }

    // Adds todos
    addTodo = async (todo) => {
        await this.setState({ todos: [...this.state.todos, todo]}); 
        localStorage.setItem('todos', JSON.stringify(this.state.todos));
        console.log(localStorage.getItem('todos'));
    };

}

export default App;