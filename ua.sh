#!/bin/bash
# upload the web app to the board

url=${1:-"http://192.168.1.13/edit"}
gzip -rkf data

# add --trace-ascii curl.log for logging

curl -v --form "file=@data/css/styles.css.gz;filename=css/styles.css.gz" $url
curl -v --form "file=@data/js/app.js.gz;filename=js/app.js.gz" $url
curl -v --form "file=@data/index.htm.gz;filename=index.htm.gz" $url
curl -v --form "file=@data/images/atom196.png.gz;filename=images/atom196.png.gz" $url
curl -v --form "file=@data/favicon.ico.gz;filename=favicon.ico.gz" $url

# remove all of the gz files
find . -name "*.gz" -type f -delete
