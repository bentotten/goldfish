import React, { Component } from 'react';

class CardTest extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            quad: -1, //Should be 1-4 (inclusive)
            prio: -1, //Should be between 1-99 (inclusive)
            due: '1453-05-29', //ISO format
            location: '',
            comment: '',
            complete: false,
            edit: false
            //subTask[]
        };
    }

    render() {
        return (
        <div className="Card">
            <header className="Card Header">
            <p>
                Edit <code>src/todos.js</code> and save to reload.
            </p>
            </header>
        </div>
        );
    };
}


export default CardTest;