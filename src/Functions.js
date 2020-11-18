import data from "./generated.json";

// Task data for reference

/*
name: '',
quad: -1, //Should be 1-4 (inclusive)
prio: -1, //Should be between 1-99 (inclusive)
due: '1453-05-29', //ISO format
location: '',
comment: '',
complete: false,
edit: false
*/

// Sorts every task in a quad by its priority
const sortQuad = (List, quad) => {
    List[quad].sort((a, b) => parseFloat(a.prio) - parseFloat(b.prio));
    return List
}


// Promote entire list of tasks
function promoteAll(List) {
    return List.map(innerList => innerList.map(element => promote(element)))
}


// Promotes a task by decrementing the priority (and quad if priority is already at 1) 
function promote(task) {

    // 1) decriment priority until hits 1
    // 2) when hits 1, reset to default and decrement quad to move up in priority list
    // 3) If quad is 1, hold prio at 1

    if(task.prio === 1 && task.quad > 1) {
            task.prio = default_prio;
            task.quad -= 1;
    }
    else if(task.prio > 1) {
        task.prio -= 1;
    }

    return task;
}


// Pulls top 5 elements out of list. TODO: Put in loop to pull n elements out of array
const pullDaily = (List, num) => {

    console.log(List[0])
    // sort list by priority
    List = sortQuad(List, 0);

    console.log(List[0])

    // Clean up and put in a loop later for n elements
    let daily = [];
    let [e1, e2, e3, e4, e5, ...rest] = List[0];
    daily[0] = e1;
    daily[1] = e2;
    daily[2] = e3;
    daily[3] = e4;
    daily[4] = e5;

    console.log(e1)
    console.log(daily)
    console.log(rest)

    return daily;
}


// Pushes a new task onto the end of a quad. Use sort function if want to sort into order by prio
const addTask = (List, newTask) => {
    const q = newTask.quad - 1;
    List[q].push({newTask});
    return List;
}


// This requires you have already found and located the task object to remove and are passing that in
const removeTask = (List, Task) => {
    const q = Task.quad -1;
    const index = List[q].indexOf(Task);
    if (index > -1) { List[q].splice(index, 1) }
    return List;
}