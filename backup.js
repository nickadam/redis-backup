'use strict'
const fs = require('fs')
const csv = require('fast-csv')
const args = require('./get-args')
const get_keys = require('./get-keys')

const redis = require('redis'),
  rdb = redis.createClient('redis://' + args.server)

if(args.action === 'backup'){
  get_keys.then(keys => {
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
    })
  })
}else if(args.action === 'restore'){
  console.log('yup')
}
