#!/bin/sh

cd /app

rm /data/redis_backup.csv 2>/dev/null

node backup.js --action backup --file /data/redis_backup.csv --server $SERVER
