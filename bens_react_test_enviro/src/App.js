import React from 'react';
import './App.css';
import TodoList from './TodoList/TodoList';
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
                <TodoList updateTodoFn={this.updateTodo} todos={this.state.todos}></TodoList>
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
        await this.setState({ todos: [...this.state.todos, {
            text: todo,
            completed: false    
        }] }); 
        localStorage.setItem('todos', JSON.stringify(this.state.todos));
        console.log(localStorage.getItem('todos'));
    };

    updateTodo = async (todo) => {
        const newTodos = this.state.todos.map(_todo => {
            if(todo === _todo) {
                return {
                    text: todo.text,
                    completed: !todo.completed
                }
            } else {
                return _todo;
            }
        });
        await this.setState({ todos: newTodos})
        localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }

}

export default App;