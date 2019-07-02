'use strict'
const args = require('./get-args.js')
const redis = require('redis'),
  rdb = redis.createClient('redis://' + args.server)

const rscan = (page, callback) => {
  rdb.scan(page, (err, keys) => {
    if(err){
      console.log('Error', err)
      process.exit()
    }
    callback(err, keys[1])
    if(keys[0] !== '0'){
      page = keys[0]
      rscan(page, callback)
    }
  })
}

module.exports = new Promise(resolve => {
  const rscan = (page = 0, cumulative_keys = []) => {
    rdb.scan(page, (err, page_keys) => {
      if(err){
        console.log('Error', err)
        process.exit()
      }
      const keys = cumulative_keys.concat(page_keys[1])
      if(page_keys[0] !== '0'){
        page = page_keys[0]
        rscan(page, keys)
      }else{
        rdb.quit()
        resolve(keys)
      }
    })
  }
  rscan()
})
