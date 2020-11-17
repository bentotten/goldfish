import React from 'react';
import Bin from './components/bin';
import ReactDOM from 'react-dom';
import { DragDropContext } from "react-beautiful-dnd";
import './styles/App.css';
import { Component } from 'react';
import { tasks } from './data';

//A function to help with reordering after dragging
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bins: tasks
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onBeforeCapture = this.onBeforeCapture(this);
  }


  //Close card editor before the drag begins
  onBeforeCapture(result) {
      //console.log(result);

  }

  /* Documentation states that during dragging ALL updates to 
   * <Draggable />s need to be stopped, and that no changes to size can happen here
   */
  onDragStart(result) {

  }

  //After a drag is finished
  onDragEnd(result) {
    //Dropped outside a bin
    if (!result.destination) {
        return;
    }
    //console.log(result.source.droppableId);
    //console.log(destIndex);

    var sourceIndex = result.source.index;
    var destIndex = result.destination.index;

    //The card is being moved around the same bin
    if(result.source.droppableId === result.destination.droppableId) {
      //console.log(this.state.bins.find(x => x.id === 1).subCards);

      //Creates a copy of the entire task list to change a sublist...really bad 
      let newBins = [...this.state.bins];
      newBins.find(x => x.id === parseInt(result.destination.droppableId)).subCards =
       reorder(this.state.bins.find(x => x.id === parseInt(result.destination.droppableId)).subCards, sourceIndex, destIndex);

      this.setState ({
        bins: newBins
      });
      return;
      //result.cards = cards;
    }
    //The card is being moved to a new bin...makes three copies which is not ideal
    else {
      let newBins = [...this.state.bins];

      //Grab a copy of the cards from each respective bin
      var sourceCards = newBins.find(x => x.id === parseInt(result.source.droppableId)).subCards;
      var destCards = newBins.find(x => x.id === parseInt(result.destination.droppableId)).subCards;

      //Remove card and put in new dest
      const [removed] = sourceCards.splice(sourceIndex, 1);
      destCards.splice(destIndex, 0, removed);

      //Read new cards to bins
      newBins.find(x => x.id === parseInt(result.source.droppableId)).subCards = sourceCards;
      newBins.find(x => x.id === parseInt(result.destination.droppableId)).subCards = destCards;

      this.setState ({
        bins: newBins
      });
      console.log("Call for help");
    }
  }

  render() { 
    return (
      <DragDropContext
      onDragEnd={this.onDragEnd}
      onBeforeCapture={this.onBeforeCapture}
      >
        <div className="App">
        {this.state.bins.map((bin, index) => (
          <Bin header={bin.header} key={bin.id} droppableId={bin.id} cards={bin.subCards}/>
        ))}
        </div>
      </DragDropContext>
    );
  }
}

export default App;
