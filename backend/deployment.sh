#! /bin/bash
# https://medium.com/@timmykko/deploying-create-react-app-with-nginx-and-ubuntu-e6fe83c5e9e7

#Log
echo "Starting Deployment" >>/var/www/log.txt

# Go to proper dir
cd /var/www/goldfish

# Install nodejs
mkdir /var/www/nodejs
curl https://nodejs.org/dist/v8.12.0/node-v8.12.0-linux-x64.tar.gz | tar xvzf - -C /opt/nodejs --strip-components=1
ln -s /var/www/nodejs/bin/node /usr/bin/node
ln -s /var/www/nodejs/bin/npm /usr/bin/npm

echo "Installed nodeje" >>/var/www/log.txt

# Create a nodeapp user. The application will run as this user.
useradd -m -d /home/nodeapp nodeapp
chown -R nodeapp:nodeapp /opt/app
USER = 'nodeapp'

echo "created nodeapp user" >>/var/www/log.txt

# Runs permissions for newly greated github repo
# find /var/www -type f -exec chmod 0660 {} \;
# find /var/www -type d -exec chmod 2770 {} \;

# Launch watcher in background to run forever
#nohup /var/www/watcher.sh &

# Get npm up to date
#npm cache clean -f
#npm install -g n
#n stable
#echo "updated npm" >>/var/www/log.txt

# Build website
npm i              #--prefix /var/www/goldfish
npm audit fix      #--prefix /var/www/goldfish
npm run build-prod #--prefix /var/www/goldfish
echo "website built" >>/var/www/log.txt

# Start nginx
# cat <<EOF >/etc/nginx/sites-available/default
#     server {
#         listen 80 default_server;
#        root /var/www/goldfish/build;
#        server_name http://fullstack-project-goldfish.ipq.co/;
#        index index.html index.htm;
#        location /files/ {
#            autoindex on;
#            root /var/www/goldfish/;
#        }
#    }
#EOF

# Configure supervisor to run the node app.
cat <<EOF >/etc/supervisor/conf.d/node-app.conf
[program:nodeapp]
directory=/var/www/goldfish
command=npm start
autostart=true
autorestart=true
user=nodeapp
environment=HOME="/home/nodeapp",USER="nodeapp",NODE_ENV="production"
stdout_logfile=syslog
stderr_logfile=syslog
EOF

supervisorctl reread
supervisorctl update
echo "Supervisor created and launched" >>/var/www/log.txt

echo "deployment-Ran" >>/var/www/log.txt

# Format Cloud instance rules
/var/www/goldfish/gcloud.sh

# Application should now be running under supervisor