outputDir=build
binFilename=tree-v2.ino.bin
ip=${1:-"192.168.0.103"}
url="http://$ip/update"

curl -v --form "file=@$outputDir/$binFilename;filename=$binFilename" $url
