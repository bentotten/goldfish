//A modal window when the user wants to focus on a bin
import Modal from 'react-modal'
import "../styles/Header.css";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card" 
import "../styles/Bin.css";

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
            className="focus-container"
            overlayClassName="overlay"
        >
            <div id="bin-container">
                <button onClick={props.closeMaker}>Close</button>
                <h1 className="bin-header">
                    {props.focusedBin.header}</h1>
                    
                <div className="bin">
                    <Droppable droppableId={props.droppableId} 
                    type="bin"
                    >   
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            //style={{backgroundColor: provided.isDragging ? 'green' : 'lightblue'}}
                            className="focus-bin"
                            {...provided.droppableProps}
                        >
                            {props.focusedBin.cards.map((cardIndex, index) => (
                                <Card key={(-props.cardList[cardIndex]._id).toString()} 
                                    draggableId={(-props.cardList[cardIndex]._id).toString()} 
                                    index={index} 
                                    cardInfo={props.cardList[cardIndex]}
                                    handleDoubleClick={(props.handleDoubleClick)}
                                    handleCardEdit={props.handleCardEdit}
                                    finishTask={props.finishTask}
                                    deleteTask={props.deleteTask}
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