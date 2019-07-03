# redis-backup

#### Utilities for backup and restore of redis

Call me crazy but I prefer text backups in files that I can manually decode and
inspect using simple tools. Problem is, some things can get lost in translation.
redis-backup provides simple backup and restore capabilities that encode and decode values in a csv file.

### Usage
```bash
# backup
docker run --rm -v $PWD:/data nickadam/redis-backup --action backup --file /data/redis_backup.csv --server redis.example.com
```
Backup connects to a redis instance and backs up everything to a csv file. Keys
and values are all stored as strings. The keys are stored as the raw string and
values are base64 encoded.

```bash
# restore
docker run --rm -v $PWD:/data nickadam/redis-backup  --action restore --file /data/redis_backup.csv --server redis.example.com
```

Restore reads backup files, decodes the values and stores them in a connected
redis instance.
