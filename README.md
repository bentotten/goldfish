# Goldfish

Goldfish React Enviro v0.02 Made with much blood and coffee

Full Stack WebApp for Scheduling and To-do lists.

This webapp is currently hosted on Google Cloud at http://fullstack-project-goldfish.ipq.co/ using N1: f1-micro.

Follow this tutorial to get started: https://cloud.google.com/compute/docs/tutorials/ssh-with-sk.

### Setup ###

#### Set up API ###

::Windows::

Follow these instructions to get google cloud sdk console

https://cloud.google.com/sdk/docs/install

::Linux::

Open a terminal and download Google SKD Shell

```wget https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-265.0.0-linux-x86_64.tar.gz```

```tar -zxf google-cloud-sdk-*```

```cd google-cloud-sdk```

```./install.sh```

Close and open a new terminal

::In Terminal or in windows cloud sdk console::

Initialize SKD Shell and log in. Follow instructions to choose or create project and set time zone.

```gcloud init```

Upgrade SDK components

```gcloud components update```

Set Project
```gcloud config set project <PROJECT NAME>```

Set login credentails
```gcloud auth application-default login```

#### Authenticate with Cloud ####

Create service account:

```gcloud iam service-accounts create service```
 ** You can replace 'service' with whatever you would like your account name to be
 
Get project ID

```gcloud projects list```

Bind policy
 
 ```gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:NAME@PROJECT_ID.iam.gserviceaccount.com" --role="roles/owner"```
 
 Generate Key
 
 ```gcloud iam service-accounts keys create FILE_NAME.json --iam-account=NAME@PROJECT_ID.iam.gserviceaccount.com```
 
 
 Setting the environment variable. PATH is where ever you stored the json key 
 ```export GOOGLE_APPLICATION_CREDENTIALS="[PATH]"```

### SSH to App ### 

From google cloud sdk
```gcloud compute ssh goldfish-app --zone=us-west1-b```

#### Set up App ####

Setup instructions using npm.

Install npm, sqlite3, python3, pip3, and openssh-server

```sudo apt install npm```

Load existing npm module
``` npm i```

Start app at localhost:3000

```npm start```

### Troubleshooting ###

The files do not transfer: Zone error

In the watcher.sh script, change 'us-west1-b' to the timezone of your database instance.

Cannot Find @Google-cloud-compute: 

Go to API setup instructions and reinstall google cloud sdk, then update componenets

```gcloud components update```

### Scheduling algorithm 

At set time intervals, all priorities will decrease by 1 (yielding a higher priority task). This ensures quad 4 tasks eventually see the light of day. When a non-quad1 task reaches 0, it is moved into the next quadrant up. Every day, the top 5 tasks are pulled from the master list. Top 5 tasks first queries and pulls any quad1 tasks. If there are no more quad1 tasks, the remaining available slots are filled by quad2 and quad3 tasks (or quad4, if there are not enough quad2/3 tasks). 50% of the available slots will be filled by a quad2 task and 40% (rounded up) will be filled by quad3 tasks. Most quad4 tasks will only be completed through promotion to quad 2 or 3, not through assignment, unless the user has an abnormally empty schedule.

### Four Quadrant System

Quadrant 1: Urgent and Important. Items here need to be completed soon and the user has marked as important. These should be completed before anything else the user does. If these are present, they take up 100% of the users time and priority. 
Examples: project deadlines, meetings, and important events.

Quadrant 2: Non-urgent but Important. Items here are critically important but not due soon. These should be encorporated into the to-do list in round-robin style chunks so that they do not reach quadrant 1, but do not absorb the users entire day if there are quadrant 3 or 4 tasks present. If these are present, they take up 50% of the the time and priority not occupied by quadrant 1 tasks. 
Examples: Far-off deadlines, professional development, and important tasks that do not have a submission date.

Quadrant 3: Urgent but not-Important. Items here need to be completed soon but are not important. These should be completed by the user daily, but should not dominate the to-do list. If these are present, they take up 45% of the time and priority not occupied by quadrant 1 tasks. 
Examples: Non-important or recreational events (like a concert), repetative tasks, optional meetings, busy work.

Quadrant 4: Non-urgent and not-Important. Items here are things that need to get done, but do not have a deadline nor are they critical. These should be completed at some point, but should not be done if there are more important things to do. If they are present, they take up 5% of the time and priority not occupied by quadrant 1 tasks. 
Examples: non-eessential chores (like returning cans to recycling center), purchasing desired items (like getting a new pair of sneakers when current pair are worn out, but still functioning), and activities like rearranging your room or starting a fun, but non-critical project. 


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
| complete [bool] | | |
| subTask [Task obj] | | |
| user [int] | | |

**Subtask is currently outside project scope

### Task List object

This is the meta-list that stores, sorts, and is referenced for pulling the daily to-do list. Uses the four quadrant method.

| Task List |
| --- |
| quad1 [array of Task objs [] ] |
| quad2 [array of Task objs [] ] |
| quad3 [array of Task objs [] ] |
| quad4 [array of Task objs [] ] |
| user [int] |

### Daily To-Do object ###

This is the daily list of to-dos pulled from the priority categories of the master list (Ben found that 5 is a reasonable number, however this could be adjusted according to user preference). 


| Daily Todos |
| --- |
| item1 [Task obj]|
| item2 [Task obj] |
| item3 [Task obj] |
| item4 [Task obj] |
| item5 [Task obj] |
| user [int] | 

### Tutorials ###

https://googleapis.dev/nodejs/compute/latest/
