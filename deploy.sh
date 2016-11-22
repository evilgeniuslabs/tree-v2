outputDir=build
binFilename=tree-v2.ino.bin
ip=${1:-"192.168.1.13"}
url="http://$ip/update"

curl -v --form "file=@$outputDir/$binFilename;filename=$binFilename" $url
