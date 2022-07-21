const figlet = require('figlet');

figlet('Hello , world!',(err,data)=>{
    err 
    ? console.log('error: ',err)
    : console.log(data);
})