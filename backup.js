'use strict'
const fs = require('fs')
const args = require('./get-args.js')


const redis = require('redis'),
  rdb = redis.createClient('redis://' + args.server)

if(args.action === 'backup'){

}else if(args.action === 'restore'){

}else{
  console.log('Nothing to do')
}


// get all keys and data from prod
rdb.keys('*', (err, keys) => {
  const promises = []
  for(const k in keys){
    const key = keys[k]
    const promise = new Promise((resolve, reject) => {
      rdb.get(key, (err, data) => {
        if(err) reject(err)
        resolve({
          key: key,
          data: data
        })
      })
    })
    promises.push(promise)
  }
  // write all data to failover
  Promise.all(promises).then(results => {
    for(const k in results){
      const result = results[k]
      const key = result.key
      const data = result.data
      rdbfail.set(key, data)
    }
    rdb.quit()
    rdbfail.quit()
  })
})
