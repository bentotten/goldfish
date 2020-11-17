import React, {useState} from 'react';

const Task = props => {
    const [text, setText] = useState('hello')
    return (<div><p>{text}</p></div>)
}

export default Task;