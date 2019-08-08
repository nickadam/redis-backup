#!/bin/sh

# if we aren't running as a daemon run with command args
if [ -z "$CRON_SCHEDULE" ]
then
  node backup.js "$@"
else
  if [ -z "$SERVER" ]
  then
    echo "Environment variables must be set"
    exit 1
  fi

  # add to crontab, start cron and sleep foverever
  echo -e "$CRON_SCHEDULE /app/cron-backup.sh" | crontab -

  crond

  sleep 3155760000
fi
