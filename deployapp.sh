#!/bin/bash
# upload the web app to the board

# investigate using a single file to bring in the defaults
# ip=$(< ip.txt)

ip=${1:-"192.168.1.13"}
url="http://$ip/edit"

declare -a filenames=("css/styles.css"
                     "js/app.js"
                     "index.htm"
                     "css/simple.css"
                     "js/simple.js"
                     "simple.htm")

# "images/atom196.png"
# "favicon.ico"

for filename in "${filenames[@]}"
do
  # add --trace-ascii curl.log for logging

  gzip -kf data/$filename

  echo $filename
  curl --form "file=@data/$filename.gz;filename=$filename.gz" $url

  rm -f data/$filename.gz
done
