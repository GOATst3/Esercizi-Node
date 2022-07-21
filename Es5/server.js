//import http
const http = require('node:http');
const port = 3000;

//create server
const server = http.createServer((req,res)=>{
    console.log('request received');
    res.statusCode=200; //Response Status OK
    res.setHeader('Content-Type','text/html')
    res.end(`
        <html>
            <body>
                <h1> This is a test for the new node.js server! </h1>
            </body>
        </html>
    `)
})
//run server on 3000 port and log
server.listen(port,()=>{
    console.log('Server running at http://localhost:3000 ...')
}) 