# Goldfish

Full Stack WebApplication for Scheduling and To-do list

## Scheduling algorithm 


## Prototypes

### Task object

This is the actual task that will be saved and moved around within the webapp

| Task | sub-obj | sub-obj |
| --- | --- | --- |
| name [string] | | |
| quad [int] | | |
| prio [int] | | |
| due [obj] | date [date/time] | time [date/time]|
| location [obj]| name [string] | address [string] |
| comment [string] | | |

### Task List

This is the meta-list that stores, sorts, and is referenced for pulling the daily to-do list. Uses the four quadrant method.

| Task List | sub-obj | sub-obj |
| --- | --- | --- |
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |

Quadrant 1: Urgent and Important. Items here need to be completed soon and the user has marked as important. These should be completed before anything else the user does. If these are present, they take up 100% of the users time and priority. Examples of these include project deadlines, meetings, and important events.

Quadrant 2: Non-urgent but Important. Items here are critically important but not due soon. These should be encorporated into the to-do list in round-robin style chunks so that they do not reach quadrant 1, but do not absorb the users entire day if there are quadrant 3 or 4 tasks present. If these are present, they take up 50% of the the time and priority not occupied by quadrant 1 tasks. Examples of these include far-off deadlines, professional development, and important tasks that do not have a submission date.

Quadrant 3: Urgent but not-Important. Items here need to be completed soon but are not important. These should be completed by the user daily, but should not dominate the to-do list. If these are present, they take up 45% of the time and priority not occupied by quadrant 1 tasks. Examples of these include non-important or recreational events, repetative tasks, optional meetings, busy work.

Quadrant 4: Non-urgent and not-Important. Items here are things that need to get done, but do not have a deadline nor are they critical. These should be completed at some point, but should not be done if there are more important things to do. If they are present, they take up 5% of the time and priority not occupied by quadrant 1 tasks. Examples of these include non essential chores (like returning cans to recycling center), purchasing desired items (like getting a new pair of sneakers when current pair are worn out, but still functioning), and activities like rearranging your room or starting a fun, but non-critical project. 
