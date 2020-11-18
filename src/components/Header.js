import "../styles/Header.css";

//Assumes that the cards will be passed in from the parent
function Header(props) {
    return (
        <div id="header-container">
            <button type="button" name="taskAdder" onClick={props.addTask}>Add A New Task</button>
        </div>
    )   
}

export default Header;