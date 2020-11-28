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
        };

        //Setup the event handler(s)
        this.handleChange = this.handleChange.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.handleDoneButton = this.handleDoneButton.bind(this);
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
    
    handleDeleteButton(e) {
        this.props.deleteTask( this.props.cardInfo._id, this.props.cardInfo._binId, this.props.index );
    }

    handleDoneButton(e) {
        this.props.finishTask( this.props.cardInfo._id );
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
                            {...provided.dragHandleProps}
                            className="drag-handle"
                            >
                            <div
                                style={(!this.props.cardInfo.complete) ? {backgroundColor: taskFunctions.colors[this.props.cardInfo.quad - 1]}:
                                                                       {backgroundColor: taskFunctions.colors[4],
                                                                        opacity: 0.75}
                                }
                                className="card"
                            >
                                <div className="card-header"
                                    onDoubleClick={this.handleDoubleClick}
                                >
                                        {(!this.state.edit) ? <p className='headerLabel'>{this.props.cardInfo.name}</p> : 
                                        <textarea value={this.props.cardInfo.name}
                                                disabled={!this.state.edit}
                                                onChange={this.handleChange}
                                                style={{cursor: "text"}}
                                                className='headerLabel'
                                        />
                                        }
                                    {provided.placeholder}                               
                                </div>

                                <select value={this.props.cardInfo.quad}
                                        onChange={this.handleChange}
                                        className="priority">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                </select>

                                <button onClick={this.handleDeleteButton} type="button" className="toggle-delete">
                                    <i class="fa fa-trash"></i>
                                </button>
                                <div className="done-container">
                                    <button onClick={this.handleDoneButton} type="button" className="toggle-done">
                                        {(!this.props.cardInfo.complete) ? <i class="fa fa-circle-thin"></i> :
                                        <i class="fa fa-check-circle-o"
                                           style={{color: "#07C217"}}></i>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </Draggable>
            </div>
        )
    }
}

export default onClickOutside(Card);