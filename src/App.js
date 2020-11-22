import './styles/App.css';
import { Component } from 'react';
import TaskBins from './components/TaskBins';
import Header from './components/Header';
import { DragDropContext } from "react-beautiful-dnd";
import * as taskFunctions from './components/Functions';
import { quickstart } from './Server';
class App extends Component {
  quickstart();

  constructor(props) {
    super(props);

    this.state = {
      bins: [],
      adderBin: [],
      showNewTask: false,
      taskNum: 0
    };
    //Mount/bind events
    this.handleClick = this.handleClick.bind(this);
    this.onBeforeCapture = this.onBeforeCapture.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.openNewTask = this.openNewTask.bind(this);
    this.closeNewTask = this.closeNewTask.bind(this);
  }

  //Called only once (after mounted onto DOM)
  componentDidMount() {
    //window.addEventListener('mousedown', this.handleClickOutside, false);
    const newBins = taskFunctions.generateBins(7);
    const newNum = taskFunctions.getTaskNum();
    let tempAdderBin = taskFunctions.extraBins[0];
    let newCard = Object.assign({}, taskFunctions.defaultCard);
    newCard._id = (newNum + 1).toString();
    tempAdderBin.cards.push(newCard);
    this.setState({
      bins: newBins,
      taskNum: newNum,
      adderBin: tempAdderBin
    })
  }

  //Called if the component will be unmounted
  componentWillUnmount() {

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
    //Dropped outside a bin, also ignore if the user is trying to move within the "adder bin"
    if (!result.destination || result.destination.droppableId === taskFunctions.otherBins.adderBin) {
        return;
    }

    //The card is being moved around the same bin
    if(result.source.droppableId === result.destination.droppableId) {
      //console.log(this.state.bins.find(x => x._id === 1).cards);

      //Creates a copy of the entire task list to change a sublist...really bad 
      let newBins = [...this.state.bins];
      newBins.find(x => x._id === parseInt(result.destination.droppableId)).cards =
      taskFunctions.reorder(this.state.bins.find(x => x._id === parseInt(result.destination.droppableId)).cards,  result.source.index, result.destination.index);

      this.setState ({
        bins: newBins
      });
      return;
    }
    //The user is adding a new card
    else if(result.source.droppableId === taskFunctions.otherBins.adderBin) {
      //Add the new card to whatever bin
      const tempAdderBin = this.state.adderBin;
      const newBins = taskFunctions.addCard(this.state.bins, tempAdderBin, result.destination);
      this.closeNewTask();

      //Increment the number of tasks
      const newTaskNum = this.state.taskNum + 1;

      //Create a brand new card
      var newCard = Object.assign({}, taskFunctions.defaultCard);
      newCard._id = (newTaskNum + 1).toString();
      tempAdderBin.cards.push(newCard);

      //Set the new bin state
      this.setState ({
        bins: newBins,
        adderBin: tempAdderBin,
        taskNum: newTaskNum
      });
      return;
    }
    //The card is being moved to a new bin...makes three copies which is not ideal
    else {
      const newBins = taskFunctions.moveCard(this.state.bins, result.source, result.destination);
      this.setState ({
        bins: newBins
      });
      return;
    }
  }

  handleClick(e) {
 
  }

  //A new task is being added
  addTask() {
    const newNum = this.state.taskNum + 1;
    this.setState ({
      taskNum: newNum
    })
  }

  openNewTask() {
    this.setState({
      showNewTask: true
    })
  }

  closeNewTask() {
    this.setState({
      showNewTask: false
    })
  }

  render() { 
    return (
      <DragDropContext
      onDragEnd={this.onDragEnd}
      onBeforeCapture={this.onBeforeCapture}
      >
      <div className="App">
        <Header newCardId={this.state.taskNum + 1}
                isOpen={this.state.showNewTask} 
                openNewTask={this.openNewTask}
                closeNewTask={this.closeNewTask}
                adderBin={this.state.adderBin}
        />
        <div className="TaskBins">
          <TaskBins bins={this.state.bins} />
        </div>
      </div>
      </DragDropContext>
    );
  }
}

export default App;
