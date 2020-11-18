
// Task data

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