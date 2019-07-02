'use strict'

const fs = require('fs')

// get arguments from process execution
for(let i = 0; i < process.argv.length; i++){
  if(process.argv[i] === '-A' || process.argv[i] === '--action'){
    if(process.argv[i + 1] === 'backup' || process.argv[i + 1] === 'restore'){
      module.exports.action = process.argv[i + 1]
    }else{
      console.log('Available actions are backup or restore')
      process.exit()
    }
  }
  if(process.argv[i] === '-F' || process.argv[i] === '--file'){
    module.exports.file = process.argv[i + 1]
  }
  if(process.argv[i] === '-S' || process.argv[i] === '--server'){
    module.exports.server = process.argv[i + 1]
  }
}

// make sure all required arguments have been supplied
if(!module.exports.file || !module.exports.action || !module.exports.server){
  console.log('To complete a backup or restore operation, please supply a file, server, and action.')
  console.log('Example: --file redis_backup.csv --action backup --server redis-server.example.com')
  process.exit()
}

// make sure file is good to go for each scenario
fs.stat(module.exports.file, (err, stats) => {
  if(module.exports.action === 'backup'){
    if(stats){
      console.log('File ' + module.exports.file + ' exists. Will not overwrite. Backup failed.')
      process.exit()
    }
  }else if(err){
    console.log('Cannot read ' + module.exports.file + '. Restore failed.')
    process.exit()
  }
})
