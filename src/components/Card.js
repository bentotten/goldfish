import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import onClickOutside from "react-onclickoutside"; //Needed for 'click outside' events to function properly
import "../styles/Card.css";
import * as taskFunctions from './Functions';

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
    }

    //Set the wrapper ref
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    //Pushes any changes up
    handleChange(e) {
        this.props.handleCardEdit(this.props.draggableId, e.target, e.target.value);
    }

    //Handles double clicking to open card for editing
    handleDoubleClick(e) {
        this.setState({ edit: true });
    }

    //Handles clicking outside card
    handleClickOutside(e) {
        this.setState({ edit: false });
    }

    render() {
        return (
            <div id="card-container">
                <Draggable
                index={this.props.index}
                //Assume that given id is not a string already
                draggableId={this.props.draggableId}>
                    {(provided, snapshot) => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className = "card">
                            <div className="card-header"
                                onDoubleClick={this.handleDoubleClick}
                                style={{backgroundColor: taskFunctions.colors[this.props.cardInfo.quad - 1]}}
                                {...provided.dragHandleProps}
                                >
                                    {(!this.state.edit) ? <h1 className='headerLabel'>{this.props.cardInfo.name}</h1> : 
                                    <textarea value={this.props.cardInfo.name}
                                              disabled={!this.state.edit}
                                              onChange={this.handleChange}
                                              className='headerLabel'
                                    />
                                    }
                                {provided.placeholder}
                                <div>
                                <button type="button" className="toggle-done">Toggle Done</button>
                                </div>
                            </div>
                            <div className={this.state.edit ? "card-content" : "hidden" }>
                                <p>A buncha content!</p>
                                <select value={this.props.cardInfo.quad}
                                        onChange={this.handleChange}
                                        className="priority">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                            </div>
                        </div>
                    )}
                </Draggable>
            </div>
        )
    }
}

export default onClickOutside(Card);