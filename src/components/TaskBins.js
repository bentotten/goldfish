import Bin from './Bin';
import { Component } from 'react';
import "../styles/TaskBins.css";

class TaskBins extends Component {

/*  constructor(props) {
    super(props);
  }
*/
  render() { 
    return (
        <div className="TaskBins">
        {this.props.bins.map((bin, index) => (
          <Bin header={bin.header} 
               binId = {bin._id}
               key={bin._id} 
               droppableId={bin._id} 
               cards={bin.cards}
               isDisabled={this.props.isDisabled}
               handleDoubleClick={this.props.handleDoubleClick}    
               openFocusBin={this.props.openFocusBin} 
          />
               
        ))}
        </div>
    );
  }
}

export default TaskBins;
