#!/bin/bash
# upload the web app to the board

url=${1:-"http://requestb.in/1lj873x1"}
gzip -rkf data

# add --trace-ascii curl.log for logging
curl -v --form "file=@data/css/bootstrap.min.css.gz;filename=css/bootstrap.min.css" $url
curl -v --form "file=@data/css/styles.css.gz;filename=css/styles.css" $url
curl -v --form "file=@data/js/app.js.gz;filename=js/app.js" $url
curl -v --form "file=@data/index.htm.gz;filename=index.htm" $url
curl -v --form "file=@data/images/atom196.png.gz;filename=images/atom196.png" $url
curl -v --form "file=@data/favicon.ico.gz;filename=favicon.ico" $url

# remove all of the gz files
find . -name "*.gz" -type f -delete
