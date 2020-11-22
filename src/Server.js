/*
// Imports the Google Cloud client library
const Compute = require('@google-cloud/compute');

// Creates a client
const compute = new Compute();

async function quickstart() {
  // Create a new VM using the latest OS image of your choice.
  const zone = compute.zone('us-central1-c');

  // TODO(developer): choose a name for the VM
   const vmName = 'vm-name';

  // Start the VM create task
  const [vm, operation] = await zone.createVM(vmName, {os: 'ubuntu'});
  console.log(vm);

  // `operation` lets you check the status of long-running tasks.
  await operation.promise();

  // Complete!
  console.log('Virtual machine created!');
}

quickstart();
*/


const Compute = require('@google-cloud/compute');
const fetch = require('node-fetch');

// See https://github.com/googleapis/nodejs-compute/blob/master/samples/startupScript.js for help script

// Creates a client
const compute = new Compute();
const zone = compute.zone('us-west1-b');

// Create a new VM 
async function VM() {

  const name = 'goldfish-app';
  const vm = zone.vm(name);

  // Setup and install after creation
   const config = {
    os: 'ubuntu',
    http: true,
    metadata: {
      items: [
        {
          key: 'startup-script',
          value: `#! /bin/bash
            # Installs apache and a custom homepage
            apt-get update
            apt-get install -y apache2
            cat <<EOF > /var/www/html/index.html
            <!doctype html>
            <h1>Hello World</h1>
            <p>This page was created from a simple start-up script!</p>`,
        },
        {
          key: 'watcher-script',
          value: `#! /bin/bash
            inotifywait -q -m -e close_write test.txt |
            while read -r filename event; do
              echo "Changes detected. Sending file..."         # or "./$filename"
              gcloud compute scp test.txt db:~/test.txt --zone us-west1-b 
              echo "Success"
            done`
        },
        /*{
          key: 'initial-script',
          value: `#! /bin/bash
            apt-get update
            apt-get install -y inotify-tools
            apt-get install -y tmux
            tmux new -s watcher
            ./watcher.sh
          `
        },*/
      ],
    },
  }



  // Start the VM creation
  console.log(`Creating VM ${name}...`);
  const [, operation] = await vm.create(config);

  // `operation` lets you check the status of long-running tasks.
  console.log(`Polling operation ${operation.id}...`);
  await operation.promise();

  // Get metadata
  console.log('Acquiring VM metadata...');
  const [metadata] = await vm.getMetadata();

  // External IP of the VM.
  const ip = metadata.networkInterfaces[0].accessConfigs[0].natIP;
  console.log(`Booting new VM with IP http://${ip}...`);

  /*
  // Ping the VM to determine when the HTTP server is ready.
  console.log('Operation complete. Waiting for IP');
  await pingVM(ip);
*/
  console.log(`\n${name} created succesfully`);

  // Complete!
  console.log('Virtual machine created!');
}


/*
//   * Poll a given IP address until it returns a result.
//   * @param {string} ip IP address to poll
//   
  async function pingVM(ip) {
    let exit = false;
    while (!exit) {
      await new Promise(r => setTimeout(r, 2000));
      try {
        const res = await fetch(`http://${ip}`);
        if (res.status !== 200) {
          throw new Error(res.status);
        }
        exit = true;
      } catch (err) {
        process.stdout.write('.');
      }
    }
  }
*/
  

VM();
