const {createServer} = require("node:http");
const app=()=>{
    return createServer((req,res)=>{
        res.statusCode=200;
        res.setHeader("Content-type","text/HTML")
        res.end("<html><body>Welcome to the World Wide Web!</body></html>")
    })
}
module.exports=app;