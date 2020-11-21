import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import onClickOutside from "react-onclickoutside"; //Needed for 'click outside' events to function properly
import "../styles/Card.css";

class Card extends Component{
    constructor(props) {
        super(props);
        this.state = {
            edit: false
            //subTask[]
        };

        //Setup the event handler(s)
        this.handleChange = this.handleChange.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        //console.log(this.props);
    }

    //Set the wrapper ref
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    //Handles any changes to the card
    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
    }

    //Handles double clicking to open card for details
    handleDoubleClick(e) {
        this.setState({ edit: true });
        //console.log('double clicked!');
    }

    //Handles clicking outside card
    handleClickOutside(e) {
        this.setState({ edit: false });
        //console.log('clicked outside!');
    }

    render() {
        return (
            <div id="card-container">
                <Draggable
                index={this.props.index}
                //Assume that given id is not a string already
                draggableId={this.props.draggableId.toString()}>
                    {(provided, snapshot) => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className = "card">
                            <div className="card-header"
                                onDoubleClick={this.handleDoubleClick}
                                {...provided.dragHandleProps}>
                                <h1>{this.props.cardInfo.name}</h1>
                                {provided.placeholder}
                            </div>
                            <div className={this.state.edit ? "card-content" : "hidden" }>
                                <p>A buncha content!</p>
                            </div>
                        </div>
                    )}
                </Draggable>
            </div>
        )
    }
}

export default onClickOutside(Card);