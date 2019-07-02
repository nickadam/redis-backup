'use strict'
module.exports = rdb => {
  return new Promise(resolve => {
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
          resolve(keys)
        }
      })
    }
    rscan()
  })
}
