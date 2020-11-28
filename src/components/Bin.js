import { Droppable } from "react-beautiful-dnd";
import "../styles/Bin.css";
import Card from "./Card"
//TODO: Optimize event passing since arrow function is not optimal

//Assumes that the cards will be passed in from the parent
function Bin(props) {
    return (
        <div id="bin-container"
        style={{backgroundColor: props.backColor}}>
            <div className="bin-header"
                onDoubleClick={() => props.openFocusBin(props.binId)}
            >
                <div className="day"
                    style={{backgroundColor: props.dayColor}}
                    >
                    <p className="day-text"
                       style={{backgroundColor: props.dayColor}}>{props.header}</p>
                </div>
                <p className="date-text">{props.date}</p>
            </div>
            <Droppable droppableId={props.droppableId.toString()} 
                       isDropDisabled={props.isDisabled}
                       type="bin"
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        //style={{backgroundColor: provided.isDragging ? 'green' : 'lightblue'}}
                        className="bin"
                        {...provided.droppableProps}
                        onMouseEnter={props.onBinEnter}
                        onMouseLeave={props.onBinLeave}
                    >
                        {props.cards.map((cardIndex, index) => (
                            <Card key={props.cardList[cardIndex]._id} 
                                  draggableId={props.cardList[cardIndex]._id} 
                                  index={index} 
                                  cardInfo={props.cardList[cardIndex]}
                                  handleCardEdit={(props.handleCardEdit)}
                                  finishTask={props.finishTask}
                                  deleteTask={props.deleteTask}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )   
}

export default Bin;