import './styles/App.css';
import { Component } from 'react';
import TaskBins from './components/TaskBins';
import Header from './components/Header';
import * as taskFunctions from './components/Functions';
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bins: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.onBeforeCapture = this.onBeforeCapture.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  //Called only once (after mounted onto DOM)
  componentDidMount() {
    //window.addEventListener('mousedown', this.handleClickOutside, false);
    const newBins = taskFunctions.generateBins(7);
    this.setState({
      bins: newBins
    })
    console.log(this.state.bins);
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
    //Dropped outside a bin
    if (!result.destination) {
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
      //result.cards = cards;
    }
    //The card is being moved to a new bin...makes three copies which is not ideal
    else {
      const newBins = taskFunctions.moveCard(this.state.bins, result.source, result.destination);
      this.setState ({
        bins: newBins
      });

    }
  }

  handleClick(e) {
    /*
    console.log("Clicked!");
    const newBins = [{ _id: 1,
                      header: "Monday",
                      cards: taskFunctions.readSort()
                    },
                    {
                      _id: 2,
                      header: "Tuesday",
                      cards: []
                    }];
    console.log(newBins);
    this.setState ({
        bins: newBins
      });*/
    }

  render() { 
    return (
      <div className="App">
        <Header addTask={this.handleClick}/>
        <div className="TaskBins">
          <TaskBins bins={this.state.bins} onDragEnd={this.onDragEnd} onBeforeCapture={this.onBeforeCapture}/>
        </div>
      </div>
    );
  }
}

export default App;
