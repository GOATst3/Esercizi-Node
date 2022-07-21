//import http
const http = require('node:http');
const port = 3000;
const jsonResponse = {planet:'mars'}

//create server
const server = http.createServer((req,res)=>{
    console.log('request received');
    res.statusCode=200; //Response Status OK
    res.setHeader('Content-Type','application/json')
    res.end(JSON.stringify(jsonResponse))
})
//run server on 3000 port and log
server.listen(port,()=>{
    console.log('Server running at http://localhost:3000 ...')
}) 