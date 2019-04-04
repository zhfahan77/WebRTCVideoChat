#!/bin/sh

IP=`cat .env | cut -d '=' -f2`

if [ -z $IP ];then
	IP=0.0.0.0
fi

sed -i "s/0.0.0.0/$IP/g" client.js