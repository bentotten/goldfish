import './styles/App.css';
import { Component } from 'react';
import Bin from './components/Bin';
import Header from './components/Header';
import BinFocused from './components/BinFocused';
import { DragDropContext } from "react-beautiful-dnd";
import * as taskFunctions from './components/Functions';
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cardList: [],
      bins: [],
      adderBin: [],
      focusedBin: [],
      showNewTask: false,
      showBinFocus: false,
      allowHorizontalScroll: true,
      taskNum: 0
    };

    //Mount/bind events
    this.handleClick = this.handleClick.bind(this);
    this.onBeforeCapture = this.onBeforeCapture.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.openNewTask = this.openNewTask.bind(this);
    this.closeNewTask = this.closeNewTask.bind(this);
    this.openFocusBin = this.openFocusBin.bind(this);
    this.closeFocusBin = this.closeFocusBin.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  //Called only once (after mounted onto DOM)
  componentDidMount() {
    const newBins = taskFunctions.generateBins();
    const newNum = taskFunctions.getTaskNum();
    const tempFocusBin = taskFunctions.extraBins[1];
    const newCardList = taskFunctions.getData();
    let tempAdderBin = taskFunctions.extraBins[0];
    let newCard = Object.assign({}, taskFunctions.defaultCard);

    newCard._id = (newNum + 1).toString();
    newCardList.push(newCard);
    tempAdderBin.cards.push(newNum);
    window.addEventListener('wheel', this.handleScroll);

    this.setState({
      cardList: newCardList,
      bins: newBins,
      taskNum: newNum,
      adderBin: tempAdderBin,
      focusedBin: tempFocusBin
    })
  }

  //Called if the component will be unmounted
  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleScroll);
  }

   //Lock horizontal scrolling to prevent weird visual glitches
  onBeforeCapture(result) {
    this.setState ({
      allowHorizontalScroll: false
    });
    //console.log(result);
  }

  /* Documentation states that during dragging ALL updates to 
  * <Draggable />s need to be stopped, and that no changes to size can happen here
  * 
  */
  onDragStart(result) {

  }

  //TODO: Change if-else to a switch for perfomance
  //After a drag is finished
  onDragEnd(result) {
    //Dropped outside a bin, also ignore if the user is trying to move within the "adder bin"
    if (!result.destination || result.destination.droppableId === taskFunctions.otherBins.adderBin) {
      this.setState ({
        allowHorizontalScroll: true
      });
      return;
    }

    //The card is being moved around the same bin
    if(result.source.droppableId === result.destination.droppableId) {
      //Creates a copy of the entire task list to change a sublist...really bad 
      let newBins = [...this.state.bins];
      let newScroll = false;

      //If the card is being reordered around the focus bin...pretend that the actual bin is being reordered
      if(result.source.droppableId === taskFunctions.otherBins.focusedBin) {
        newBins.find(x => x._id === parseInt(this.state.focusedBin._id)).cards =
        taskFunctions.reorder(this.state.bins.find(x => x._id === parseInt(this.state.focusedBin._id)).cards,  result.source.index, result.destination.index);  
      } else { 
        newBins.find(x => x._id === parseInt(result.destination.droppableId)).cards =
        taskFunctions.reorder(this.state.bins.find(x => x._id === parseInt(result.destination.droppableId)).cards,  result.source.index, result.destination.index);
        newScroll = true;
      }

      this.setState ({
        bins: newBins,
        allowHorizontalScroll: newScroll
      });
      return;
    }

    //The user is adding a new card
    else if(result.source.droppableId === taskFunctions.otherBins.adderBin) {
      //Add the new card to whatever bin
      const tempAdderBin = this.state.adderBin;
      let newBins = [];
      let newScroll = false;

      //Check if the bin being added to is the focus bin (if it is, pretend it's the actual bin)
      if(result.destination.droppableId === taskFunctions.otherBins.focusedBin) {
        result.destination.droppableId = this.state.focusedBin._id;
        newBins = taskFunctions.addCard(this.state.bins, tempAdderBin, result.destination);
      } else {
        newBins = taskFunctions.addCard(this.state.bins, tempAdderBin, result.destination);
        newScroll = true;
      }
      this.closeNewTask();

      //Increment the number of tasks
      const newTaskNum = this.state.taskNum + 1;

      //Create a brand new card
      var newCard = Object.assign({}, taskFunctions.defaultCard);
      newCard._id = (newTaskNum + 1).toString();
      let newCardList = this.state.cardList;

      newCardList.push(newCard);
      tempAdderBin.cards.push(newTaskNum);

      //Set the new bin state
      this.setState ({
        cardList: newCardList,
        bins: newBins,
        adderBin: tempAdderBin,
        taskNum: newTaskNum,
        allowHorizontalScroll: newScroll
      });
      return;
    }
    //The card is being moved to a new bin...makes three copies which is not ideal
    else {
      const newBins = taskFunctions.moveCard(this.state.bins, result.source, result.destination);
      this.setState ({
        bins: newBins,
        allowHorizontalScroll: true
      });
      return;
    }
  }

  handleClick(e) {
 
  }

  //Handles double clicking to open card for details
  handleDoubleClick(e) {
    //console.log(e);
  }

  //Handles scrolling for the horizontal bin holding div
  handleScroll(e) {

    if (this.state.allowHorizontalScroll === true) {
      //console.log('Scroll!');
      //console.log(e);
  
      console.log(document.getElementById('TaskBins'));
      document.getElementById('TaskBins').scrollLeft += (e.deltaY / Math.abs(e.deltaY)) * 50;
    }
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

  openFocusBin(binId) {
    const newFocus = this.state.bins[binId - 1];
    this.setState({
      showBinFocus: true,
      focusedBin: newFocus,
      allowHorizontalScroll: false
    })
  }

  closeFocusBin() {
    const tempFocusBin = taskFunctions.extraBins[1];
    this.setState({
      showBinFocus: false,
      focusedBin: tempFocusBin,
      allowHorizontalScroll: true
    })
  }

  render() { 
    return (
      <DragDropContext
      onDragEnd={this.onDragEnd}
      onBeforeCapture={this.onBeforeCapture}
      >
        <div>
        <Header newCardId={this.state.taskNum + 1}
                isOpen={this.state.showNewTask} 
                openNewTask={this.openNewTask}
                closeNewTask={this.closeNewTask}
                adderBin={this.state.adderBin}
                cardList={this.state.cardList}
        />
        </div>
        <div className="App">
          <div id="TaskBins"
            onWheel={this.handleScroll}>
            {this.state.bins.map((bin, index) => (
              <Bin header={bin.header} 
                  date={bin.date}
                  binId = {bin._id}
                  key={bin._id} 
                  droppableId={bin._id} 
                  cards={bin.cards}
                  isDisabled={this.state.showBinFocus}
                  handleDoubleClick={this.handleDoubleClick}    
                  openFocusBin={this.openFocusBin} 
                  cardList={this.state.cardList}
              />
          ))}
          </div>
          <div>
            <BinFocused droppableId={taskFunctions.otherBins.focusedBin}
                        isOpen={this.state.showBinFocus}
                        closeMaker={this.closeFocusBin}
                        focusedBin={this.state.focusedBin}
                        cardList={this.state.cardList}
            />
          </div>
          <div className="Today-button">
            <button type="button" >Move to today</button>
          </div>
        </div>
      </DragDropContext>
    );
  }
}

export default App;
