import { Droppable } from "react-beautiful-dnd";
import "../styles/Bin.css";
import Card from "./Card"
//TODO: Optimize event passing since arrow function is not optimal

//Assumes that the cards will be passed in from the parent
function Bin(props) {
    return (
        <div id="bin-container">
            <div className="bin-header"
                onDoubleClick={() => props.openFocusBin(props.binId)}
            >
                <h1>{props.date}</h1>
                <h2>{props.header}</h2>
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
                                  handleDoubleClick={(props.handleDoubleClick)}
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