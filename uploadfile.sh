#!/bin/bash
# upload the web app to the board

# investigate using a single file to bring in the defaults
# ip=$(< ip.txt)

ip=${1:-"192.168.1.13"}
url="http://$ip/edit"
filename=$2

# add --trace-ascii curl.log for logging

gzip -kf data/$filename

echo $filename
curl --form "file=@data/$filename.gz;filename=$filename.gz" $url

rm -f data/$filename.gz
