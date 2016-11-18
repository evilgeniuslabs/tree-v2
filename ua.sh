#!/bin/bash
# upload the web app to the board

url=${1:-""}
gzip -rkf data

echo ""
echo data/css/bootstrap.min.css.gz
curl -v --trace-ascii curl.log -F "filename='/css/bootstrap.min.css'" -F "file=@data/css/bootstrap.min.css.gz" http://192.168.1.14/edit

#echo ""
#echo data/index.htm.gz
#curl -v -F "file=@data/index.htm.gz" $url
find . -name "*.gz" -type f -delete
