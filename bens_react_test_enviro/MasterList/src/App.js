import './App.css';
import Todo from './Components/todo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div src={Todo} className="Todo" alt="todo" />
        <ul>
            {<Todo />}
        </ul> 
      </header>
    </div>
  );
}


export default App;
