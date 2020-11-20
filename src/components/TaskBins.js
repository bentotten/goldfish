import Bin from './Bin';
import { DragDropContext } from "react-beautiful-dnd";
import { Component } from 'react';
import "../styles/TaskBins.css";

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
            <Card key={item._id} draggableId={item._id} index={index} />
        ));
    }
}*/

//<!--<InnerList cards={this.props.cards} />-->

class TaskBins extends Component {

  constructor(props) {
    super(props);
  }

  render() { 
    return (
      <DragDropContext
      onDragEnd={this.props.onDragEnd}
      onBeforeCapture={this.props.onBeforeCapture}
      >
        <div className="TaskBins">
        {this.props.bins.map((bin, index) => (
          <Bin header={bin.header} key={bin._id} droppableId={bin._id} cards={bin.cards}/>
        ))}
        </div>
      </DragDropContext>
    );
  }
}

export default TaskBins;
