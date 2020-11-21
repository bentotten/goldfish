//A modal window when the user wants to focus on a bin
import{ Component } from 'react';
import Modal from 'react-modal'
import "../styles/Header.css";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "./Card" 
import "../styles/Bin.css";
import Bin from './Bin';

Modal.setAppElement('#root');

/* A modal window for when the user wants to create a new task
 * Since all card id's are unique, passes the negation for the copy
 */
function BinFocused(props) {
    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeMaker}
            shouldCloseOnOverlayClick={false}
            contentLabel="Example Modal"
            className="task-window"
        >
            <div>
                <h1>A BIN!</h1>
                <button onClick={props.closeMaker}>Close</button>
            </div>
            <div id="bin-container">
                <h1 className="bin-header">
                    {props.focusedBin.header}</h1>
                <div>
                <Droppable droppableId={props.droppableId} 
                        type="bin"
                >
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={{backgroundColor: provided.isDragging ? 'green' : 'lightblue'}}
                            className="bin"
                            {...provided.droppableProps}
                        >
                            {props.focusedBin.cards.map((card, index) => (
                                <Card key={-card._id} 
                                    draggableId={-card._id} 
                                    index={index} 
                                    cardInfo={card}
                                    handleDoubleClick={(props.handleDoubleClick)}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                </div>
            </div>
        </Modal>
    )   
}

export default BinFocused;