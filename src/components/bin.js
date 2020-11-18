import React, { Component, PureComponent } from 'react';
import { Droppable } from "react-beautiful-dnd";
import "../styles/bin.css";
import Card from "./card"

//Assumes that the cards will be passed in from the parent
function Bin(props) {
    return (
        <div id="bin-container">
            <h1>{props.header}</h1>
            <Droppable droppableId={props.droppableId.toString()} type="bin">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={{backgroundColor: provided.isDragging ? 'green' : 'lightblue'}}
                        className="bin"
                        {...provided.droppableProps}
                    >
                        {props.cards.map((card, index) => (
                            <Card key={card.id} draggableId={card.id} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )   
}

export default Bin;