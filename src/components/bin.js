import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import "../styles/bin.css";
import Card from "./card"
import Task from './Task';

//A seperate class for lists, will potentially be put in later
//PureComponent has builtin shouldComponentUpdate
/*
class InnerList extends PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            cards: []
        };
    }

    render() {
        return this.props.cards.map((item, index) => (
            <Card key={item.id} draggableId={item.id} index={index} />
        ));
    }
}*/

//<!--<InnerList cards={this.props.cards} />-->

//A function to help with reordering after dragging
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  }

//Assumes that the cards will be passed in from the parent
class Bin extends Component {
    constructor(props) {
        super(props);
        //console.log(this.props);
        this.state = {
            header: this.props.header,
            cards: this.props.cards
        };
    }

    render() {
        return (
            <div id="bin-container">
                <h1>{this.state.header}</h1>
                <Task />
                <Droppable droppableId={this.props.droppableId.toString()} type="bin">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{backgroundColor: provided.isDragging ? 'green' : 'lightblue'}}
                            className="bin"
                            {...provided.droppableProps}
                        >
                            {this.props.cards.map((card, index) => (
                                <Card key={card.id} draggableId={card.id} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        )
    }
}

export default Bin;