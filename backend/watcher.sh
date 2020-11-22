#!/bin/bash

key="goldfish"

inotifywait -q -m -e close_write test.txt |
while read -r filename event; do
  echo "Changes detected. Sending file..."         # or "./$filename"
  gcloud compute scp test.txt db:~/test.txt --zone us-west1-b 
  echo "Success"
done
