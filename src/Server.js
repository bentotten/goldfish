
/***** NOTE: THIS WILL ONLY WORK IF YOU HAVE CONFIGURED YOUR GOOGLE ACCOUNT PER THE README! YOU MUST SET UP CREDENTIALS BETWEEN YOUR LOCAL MACHINE AND THE GOOGLE API *****/
// Repo url
const repo = 'https://github.com/bentotten/goldfish.git'
XDG_CONFIG_HOME = '${XDG_CONFIG_HOME-}'
HOME = '${HOME}'
XDG_CONFIG_HOME = '${XDG_CONFIG_HOME}'

// Config file and scripts to install on the new instance
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
mkdir /var/www
echo "Startup Started" > /var/www/log.txt
export HOME=/var/www
cwd /var/www/
echo "export HOME=/root" >> /var/www/log.txt
echo "YOU FOUND ME" > ~/find_me.txt
apt update
apt install -y inotify-tools tmux git nginx build-essential supervisor npm
echo "installed dependencies" >> /var/www/log.txt
apt -y upgrade
echo "Startup-Ran" >> /var/www/log.txt
echo "Starting Deployment" >>/var/www/log.txt

# Install nodejs
mkdir /var/www/nodejs
curl https://nodejs.org/dist/v8.12.0/node-v8.12.0-linux-x64.tar.gz | tar xvzf - -C /opt/nodejs --strip-components=1
ln -s /var/www/nodejs/bin/node /usr/bin/node
ln -s /var/www/nodejs/bin/npm /usr/bin/npm
echo "Installed nodejs" >>/var/www/log.txt

# Create a nodeapp user. The application will run as this user.
useradd -m -d /home/nodeapp nodeapp
chown -R nodeapp:nodeapp /var/www/
USER = 'nodeapp'
sudo gpasswd -a "$USER" www-data
find /var/www -type f -exec chmod 0660 {} \;
find /var/www -type d -exec chmod 2770 {} \;
echo "created nodeapp user" >>/var/www/log.txt

# Fix NPM's issues
npm cache clean -f
npm install -g n
n lts
echo "Installed fresh npm" >>/var/www/log.txt

# Make template for githooks
cat <<EOF >/usr/share/git-core/templates/hooks/post-merge
#!/bin/bash
rm -rf /var/www/goldfish/build
npm install --prefix /var/www/goldfish
npm run build --prefix /var/www/goldfish
systemctl restart nginx
echo "website redeployed!" >>/var/www/log.txt
EOF
chmod 755 /var/www/goldfish/.git/hooks/post-merge
echo "githook enabled" >>/var/www/log.txt

# Configure Cronjob
crontab -l > /tmp/jobs.txt 
echo "* * * * * git -C /var/www/goldfish pull" >> /tmp/jobs.txt 
crontab /tmp/jobs.txt 
echo crontab -l >> /var/www/log.txt

# git repo and install dependencies
git config --global credential.helper gcloud.sh
git -C /var/www clone ${repo}
cwd /var/www/goldfish
# Set permissions for new githooks
#find /var/www/goldfish/.git/hooks -type f -exec chmod 2770 {} \;
#git -C /var/www/goldfish branch temp
# Set permissions for new githooks
#find /var/www/goldfish/.git/hooks -type f -exec chmod 2770 {} \;
#git -C /var/www/goldfish checkout temp
#git -C /var/www/goldfish checkout main
#git -C /var/www/goldfish -d temp
echo "cloned repo" >> /var/www/log.txt

#npm install
echo "Starting npm i..." >>/var/www/log.txt
bash --login -c 'cd /var/www/goldfish ; npm i'
npm i --prefix /var/www/goldfish # trying with git hooks instead
npm audit fix --prefix /var/www/goldfish
npm run build --prefix /var/www/goldfish
echo "website built" >>/var/www/log.txt

# Setup nginx
cat <<EOF >/etc/nginx/sites-available/goldfish
server {
    listen 80 default_server;
  root /var/www/goldfish/build;
  server_name _;
  index index.html;
  location /files/ {
      autoindex on;
    root /var/www/goldfish/;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/goldfish /etc/nginx/sites-enabled/goldfish

# Setup supervisor config
        #cat > /etc/supervisor/conf.d/node-app.conf <<EOF
#[program:nginx]
#command=/usr/sbin/nginx -g "daemon off;"
#autostart=true
#autorestart=true
#numprocs=1
#startsecs=0
##process_name=%(program_name)s_%(process_num)02d
#user=nodeapp
#environment=HOME="/home/nodeapp",USER="nodeapp",NODE_ENV="production"
#stderr_logfile=/var/log/supervisor/%(program_name)s_stderr.log
#stderr_logfile_maxbytes=10MB
#stdout_logfile=/var/log/supervisor/%(program_name)s_stdout.log
#stdout_logfile_maxbytes=10MB
#EOF

#supervisorctl reread
#supervisorctl update
#echo $(supervisorctl) >> /var/www/log.txt
#echo "Supervisor created and launched" >>/var/www/log.txt

echo "deployment-Ran" >>/var/www/log.txt

echo "Starting firewall rules" >>/var/www/log.txt

#gcloud compute firewall-rules create default-allow-http-8080 \
#--allow tcp:8080 \
#--source-ranges 0.0.0.0/0 \
#--target-tags http-server \
#--description "Allow port 8080 access to http-server"

#echo "gcloud-Ran" >> /var/www/log.txt

# Make install script
cat <<EOF > /var/www/install.sh
#!/bin/bash
npm install
EOF

# Set systemd servive if all else fails lol
cat <<EOF > /etc/systemd/system/goldfish.service
[Unit]
Description=Golfish server

[Service]
Type=simple
WorkingDirectory=/var/www/
#ExecStartPre=-/usr/bin/npm install
ExecStart=/var/www/install.sh

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl start goldfish
systemctl enable goldfish

# Set up nginx folder environment
rm -rf /var/www/html
ln -s /var/www/goldfish/build/ /var/www/html/
rm /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

echo systemctl status goldfish >> /var/www/log.txt
echo "Done" >>/var/www/log.txt
echo "Setup Complete"

`,
      },
    ],
  },
}

const old = {
  os: 'ubuntu',
  http: true,
  zone: 'us-west1-b',
  metadata: {
    items: [
      {
        key: 'startup-script',
        value: `#! /bin/bash
# Install dependencies from apt
apt-get update
apt-get install -yq ca-certificates git build-essential supervisor
sudo timedatectl set-timezone America/Los_Angeles  # For some reason new instances have the wrong date-time
systemctl restart systemd-timedated

# Install nodejs
mkdir /opt/nodejs
cd /opt/nodejs
curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n
bash n lts
ln -s /opt/nodejs/bin/node /usr/bin/node
ln -s /opt/nodejs/bin/npm /usr/bin/npm

# Clone repo
apt install -y git
export HOME=/root
git config --global credential.helper gcloud.sh
mkdir /op/app
#git -C /opt/app/ clone https://github.com/bentotten/goldfish


# Make dir and symlink it
git -C /var/www/ clone https://github.com/bentotten/goldfish
npm install


#Sample website
git -C /var/www clone https://github.com/prismicio/reactjs-website
npm install --prefix /var/www/reactjs-website
        `,
      },
    ],
  },
}



// You must have a project already and your google account synced for this to work! See README.md

'use strict';

async function main() {
  // [START gce_startup_script]
  const Compute = require('@google-cloud/compute');
  const fetch = require('node-fetch');

  // See https://github.com/googleapis/nodejs-compute/blob/master/samples/startupScript.js for help script

  // Creates a client
  const compute = new Compute();
  const zone = compute.zone('us-west1-b');
  const vmName = 'goldfish';
  const testVM = zone.vm(vmName);

  testVM.exists(function (err, exists) {
    if (exists) {
      console.log(`VM Instance already exists`)
    }

    else if (!exists) {
      // Create a new VM 
      async function VM() {

        const name = 'goldfish';
        const vm = zone.vm(name);

        // Setup and install after creation. This also installs and starts the bash script watcher.sh which waits for a file to be uploaded and sends it to the database
        // Currently set to send test.txt, TODO: Change this to sqlite db before launch
        



        // Start the VM creation
        console.log(`Creating VM ${name}...`);
        const [, operation] = await vm.create(config);
        //const [, operation] = await vm.get(config);

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

      VM();

    }
  }); // For exists()


}

main();

