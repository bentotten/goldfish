import './styles/App.css';
import { Component } from 'react';
import { tasks } from './data';
import TaskBins from './components/TaskBins';
import Header from './components/Header';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bins: tasks
    };
  }

  //Called only once (after mounted onto DOM)
  componentDidMount() {
    //window.addEventListener('mousedown', this.handleClickOutside, false);
  }

  //Called if the component will be unmounted
  componentWillUnmount() {

  }

  handleClick(e) {
    console.log("Clicked!");
  }

  render() { 
    return (
      <div className="App">
        <Header addTask={this.handleClick}/>
        <div className="TaskBins">
          <TaskBins bins={this.state.bins}/>
        </div>
      </div>
    );
  }
}

export default App;
