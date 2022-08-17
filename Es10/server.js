const fs = require('fs');
const path = 'New File.txt'
const content = 'This message was written from node with fs api'

fs.writeFile(path,content,(err)=>{
    if (err) throw new Error (err)
    console.log('file written');

})