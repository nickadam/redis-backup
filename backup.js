'use strict'
const fs = require('fs')
const csv = require('fast-csv')
const args = require('./get-args')
const get_keys = require('./get-keys')

const redis = require('redis'),
  rdb = redis.createClient('redis://' + args.server)

if(args.action === 'backup'){
  get_keys(rdb).then(keys => {
    const promises = []
    for(const i in keys){
      const key = keys[i]
      promises.push(new Promise((resolve, reject) => {
        rdb.get(key, (err, value) => {
          if(err) reject(err)
          resolve({
            key: key,
            value: Buffer.from(value).toString('base64'),
          })
        })
      }))
    }
    Promise.all(promises).then(results => {
      rdb.quit()
      csv.write(results, { headers: true })
        .pipe(fs.createWriteStream(args.file))
      console.log(results.length + ' records backed up')
    })
  })
}else{
  let count = 0
  fs.createReadStream(args.file)
    .pipe(csv.parse({ headers: true }))
    .on('data', row => {
      rdb.set(row.key, Buffer.from(row.value, 'base64').toString('utf8'))
      count++
    })
    .on('end', () => {
      console.log(count + ' records restored')
      rdb.quit()
    })
}
