/***** NOTE: THIS WILL ONLY WORK IF YOU HAVE CONFIGURED YOUR GOOGLE ACCOUNT PER THE README! YOU MUST SET UP CREDENTIALS BETWEEN YOUR LOCAL MACHINE AND THE GOOGLE API *****/
// Repo url
const repo = 'https://github.com/bentotten/goldfish.git'  // Repo goes here
const dir = '/var/www/'                                   // Directory for repo goes here
const log = `${dir}.log.txt`                              // Path for log file goes here
const name = 'test-app'                                   // Instance name - must be lowercase
const repo_name = 'goldfish'                              // This will be attached to the end of the dir variable to access your repo, be sure it has correct capitalizations
const time_zone = 'us-west1-b'                                 // time zone your instance will be configured with - very important to remember for ssh/scp purposes

// Config file and scripts to install on the new instance
/* This spins up a new vm instance on the cloud, installs all the needed software with apt, clones the github repo, installs npm modules, runs npm build
   then launches the nginx server and starts hosting the webpage. This also writes and installs a cronjob to check the remote repo every minute for changes
   and automatically pulls if there are any. After updating the repo, using githooks, the old build folder is removed, npm installs new packages, and a new
   build a new one, restarts the nginx server, and logs it in /var/www/logs.txt
*/

/******  IMPORTANT! DO NOT FORMAT THESE LINES! CONFIG FILE CANNOT READ THE WHITE SPACE!   *********/
const config = {
  os: 'ubuntu',
  http: true,
  metadata: {
    items: [
      {
        key: 'startup-script',
        value: `#! /bin/bash

# Start setting root and install updates and tools
mkdir ${dir}
echo "Startup Started" > ${log}
export HOME=/var/www
echo "export HOME=/root" >> ${log}
apt update
apt install -y git nginx build-essential npm
echo "installed dependencies" >> ${log}
apt -y upgrade
echo "Startup complete" >> ${log}
echo "Starting Deployment" >> ${log}

# Install nodejs
echo "Starting nodejs install" >> ${log}
mkdir ${dir}nodejs
curl https://nodejs.org/dist/v8.12.0/node-v8.12.0-linux-x64.tar.gz | tar xvzf - -C /opt/nodejs --strip-components=1
ln -s ${dir}nodejs/bin/node /usr/bin/node
ln -s ${dir}nodejs/bin/npm /usr/bin/npm
echo "Installed nodejs" >> ${log}

# Create a nodeapp user
echo "Creating nodeapp user" >> ${log}
useradd -m -d /home/nodeapp nodeapp
chown -R nodeapp:nodeapp ${dir}
USER = 'nodeapp'
sudo gpasswd -a "$USER" www-data
find /var/www -type f -exec chmod 2775 {} \;
find /var/www -type d -exec chmod 2775 {} \;
echo "Created nodeapp user" >> ${log}

# Make template for githooks
echo "Creating githook configuration" >> ${log}
cat <<EOF >/usr/share/git-core/templates/hooks/post-merge
#!/bin/bash
rm -rf ${dir}${repo_name}
/usr/local/bin/npm install --prefix ${dir}${repo_name}
/usr/local/bin/npm run build --prefix ${dir}${repo_name}
find ${dir} -type f -exec chmod 2775 {} \;
find ${dir} -type d -exec chmod 2775 {} \;
systemctl restart nginx
echo "githook config file created" >> ${log}
EOF
chmod 755 ${dir}${repo_name}.git/hooks/post-merge
echo "githook enabled" >> ${log}

# Fix NPM's version issues
echo "Updating npm" >> ${log}
npm cache clean -f
npm install -g n
n lts
npm update 
echo "Updated npm" >> ${log}


# Configure Cronjob
echo "Creating cronjob" >> ${log}
crontab -l > /tmp/jobs.txt 
echo "* * * * * git -C ${dir}${repo_name} pull > /dev/null/ 2>&1" >> /tmp/jobs.txt 
crontab /tmp/jobs.txt 
echo crontab -l >> ${log}
echo "Cron created" >> ${log}

# git repo and install dependencies
echo "Clone git repository" >> ${log}
git config --global credential.helper gcloud.sh
git -C ${dir} clone ${repo}
# Set permissions for new githooks
find ${dir}${repo_name}.git/hooks -type f -exec chmod 2770 {} \;
echo "Git repository cloned" >> ${log}

#npm install (One of these works :V )
echo "Building application" >> ${log}
bash --login -c 'cd ${dir}${repo_name} ; npm i'
npm i --prefix ${dir}${repo_name} # trying with git hooks instead
npm audit fix --prefix ${dir}${repo_name}
npm run build --prefix ${dir}${repo_name}
echo "Application built" >> ${log}

# Build npm
/usr/local/bin/npm run build --prefix ${dir}${repo_name}
#if [ ! -f ${dir}${repo_name}/build]; npm run build --prefix ${dir}${repo_name}
#if [ ! -f ${dir}${repo_name}/build]; npm run build --prefix ${dir}${repo_name} >> var/test.log >&2
#if [ ! -f ${dir}${repo_name}/build]; then sudo -u nodeapp npm run build --no-dll --prefix ${dir}${repo_name} >> /var/www/test.log >&2
#if [ ! -f ${dir}${repo_name}/build]; then npm run build --no-dll --prefix ${dir}${repo_name} >> /var/www/test.log >&2

# Setup nginx
echo "Configuring nginx" >> ${log}
cat <<EOF >/etc/nginx/sites-available/${repo_name}
server {
    listen 80 default_server;
  root ${dir}${repo_name}/build;
  server_name _;
  index index.html;
  location /files/ {
      autoindex on;
    root ${dir}${repo_name};
    }
}
EOF
sudo ln -s /etc/nginx/sites-available/${repo_name} /etc/nginx/sites-enabled/${repo_name}
echo "nginx configured" >> ${log}

# Make install script
echo "Configuring npm script" >> ${log}
cat <<EOF > ${dir}install.sh
#!/bin/bash
/usr/local/bin/npm install --prefix ${dir}${repo_name}
/usr/local/bin/npm run build --prefix ${dir}${repo_name}
EOF

# Set up nginx folder environment
rm -rf /var/www/html
ln -s /var/www/${repo_name}/build/ /var/www/html/
rm /etc/nginx/sites-enabled/default
sudo systemctl restart nginx
echo "Npm script configured" >> ${log}

# Set systemd service for nginx on restart
echo "Starting system service configuration" >> ${log}
cat <<EOF > /etc/systemd/system/nginx.service
[Unit]
Description=The NGINX HTTP and reverse proxy server
After=syslog.target network-online.target remote-fs.target nss-lookup.target
Wants=network-online.target

[Service]
Type=forking
PIDFile=/run/nginx.pid
ExecStartPre=/usr/sbin/nginx -t
ExecStart=/usr/sbin/nginx
ExecReload=/usr/sbin/nginx -s restart
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl start nginx
systemctl enable nginx
echo "System service configuration started" >> ${log}

# Last attempt to change permissions for githook
chmod 755 /var/www/goldfish/.git/hooks/post-merge

echo "Done" >> ${log}
echo "Setup Complete" > >&1
`,
      },
    ],
  },
}


// You must have a project already and your google account synced for this to work - See README.md
// See https://github.com/googleapis/nodejs-compute/blob/master/samples/startupScript.js for help script
'use strict';

async function main() {
  // [START gce_startup_script]
  const Compute = require('@google-cloud/compute');
  const fetch = require('node-fetch');

  // Creates a client
  const compute = new Compute();
  const zone = compute.zone(time_zone);
  const vmName = repo_name;
  const testVM = zone.vm(vmName);

  testVM.exists(function (err, exists) {
    if (exists) {
      console.log(`VM Instance already exists`)
    }

    else if (!exists) {
      // Create a new VM 
      async function VM() {
        const vm = zone.vm(name);

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

        // Ping the VM to determine when the HTTP server is ready.
        console.log('Operation complete. Waiting for IP');
        await pingVM(ip);

        console.log(`\n${name} created succesfully`);

        // Complete!
        console.log('Virtual machine created!');

      }


      // Poll a given IP address until it returns a result.
      // @param {string} ip : IP address to poll
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

      VM();

    }
  }); // For exists()
}



// export const spinup = () => {
  main();
// }

