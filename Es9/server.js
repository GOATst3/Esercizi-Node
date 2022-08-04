const app = require('./app');
const server = app()

server.listen(3000,()=>console.log('server running on localhost:3000...'))