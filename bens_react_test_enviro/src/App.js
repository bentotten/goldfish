import React from 'react';
import './App.css';
import TodoList from './TodoList/TodoList';
import TodoItem from './TodoItem/TodoItem';

// Todo list render
class App extends React.Component {
    render() {
        return(
            <div>
                <TodoList></TodoList>
                <TodoItem></TodoItem>
            </div>
        );
    }

    // See if theres anything in local storage about to-dos
    componentDidMount = () => {
        const todos = localStorage.getItem('todos');
        if(todos) {
            console.log('Has to-dos', todos);
        } else {
            console.log('No to-dos');
        }
    }

}

export default App;