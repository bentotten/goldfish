import data from "./generated.json";

const default_prio = 10;    // Default priority when added or promoted to top of quad
const del = 100;  // Emergency delimiter for testing
let List= [];  // Change to const once using react



// Write out to JSON !!IMPORTANT: Stores to browser. Use Ajax to pull from browser to server
const writeOut = (to_write) => {
    let jsonData = JSON.stringify(to_write);

    fs.mkdir('/home', function() {
        fs.writeFile('/home/data.json', jsonData, function() {
            fs.readFile('/home/data.json', 'utf-8', function(err, data) {
                console.log(data);
            });
        });
    });

}


// Sorts every task in a quad by its priority
const sortQuad = (List, quad) => {
    List[quad].sort((a, b) => parseFloat(a.prio) - parseFloat(b.prio));
    return List
}


// Pull JSON data and file it into list
const readSort = (List, data) => {
    // Push into list by quad
    let x = -1;
    for (let i = 0; i < (data.length -1) && i < del; ++i ) {
        x = data[i].quad -1;
            
        // Check for existance and save if not
        if(typeof List[x] === 'undefined') {
            List[x] = [];
            List[x][0] = data[i];
        }  
        else {
            let newData = data[i];
            List[x].push(newData);
        }
            
    }

    // Sort quads by prio
    for(let i = 0; i < 4; ++i) {
        List = sortQuad(List, i);
    }

    return List;
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