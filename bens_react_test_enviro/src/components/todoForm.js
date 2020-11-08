import React, { useState } from 'react';

function todoForm() {
    const [input, setInput] = useState('')
    return (
        <form className="todo-form">
            <input 
            type="text" 
            placeholder="Add a Task" 
            value={input} 
            name="text" 
            className="todo-input"
            />
            <button className="todo-button"></button>
        </form>
    )
}

export default todoForm