#!/bin/bash
# usage: ./power.sh 192.168.1.243 [on|off]

ip=${1:-"192.168.1.243"}
value=${2:-"off"}

if [ $value = "off" ]; then
	curl -X POST http://$ip/power?value=0
else
	curl -X POST http://$ip/power?value=1
fi

