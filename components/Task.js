import React, { Component } from 'react';

// Task Class
class Task extends React.Component {
    render() 
        return();   // Unsure if needed

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

// Task Class
class TaskList extends React.Component {
    render() 
        return();   // Unsure if needed

        // Task Prototype
        TaskList.defaultProps = {
            // Required inputs
            quad1 = [],
            quad2 = [],
            quad3 = [],
            quad4 = []
        }

}

export default TaskList;

// Task Class
class Daily extends React.Component {
    render() 
        return();   // Unsure if needed

        // Task Prototype
        Daily.defaultProps = []

}

export default Daily;
