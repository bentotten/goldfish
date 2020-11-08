import React from 'react';
import TodoItem from '../TodoItem/TodoItem';



class TodoList extends React.Component {
    render() {

        const { todos } = this.props;

        return(
            <div className='todoListContainer'>
                {
                    todos.map((_todo, _index) => {
                        return (
                            <TodoItem key={_index} todo={_todo}> </TodoItem>
                        )
                    })
                }
            </div>
        );
    }

}

export default TodoList;