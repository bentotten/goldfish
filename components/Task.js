import React, { Component } from 'react';

// Task Class
class Task extends React.Component {
    render() 
        return(
            <h1>Hello from the Task Component!</h1>;
        );

        // Task Prototype
        Task.defaultProps = {
            // Required inputs
            name: '',
            // Quadrant: 1-4; Used to designate Important/Urgent/Not Important/Not Urgent Quad
            quad: 0,
            // Priority: sub list within quads that designates internal priority in such
            prio: 0,
            
            // ** THE FOLLOWING ARE OPTIONAL AND SHOULD BE CODED TO BE ADDED AS AN "EXTENDED" MENU
            // Due date - TODO: this needs work, need to figure out date/times in react
            due: [date: '', time: '' ],
            location: '',
            comment:''
        }

}

export default Task;
