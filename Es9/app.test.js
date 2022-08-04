const app = require('./app');
const supertest = require('supertest');
const request = supertest(app())
test('GET /', async ()=>{
    const response = await request.get('/')
        .expect(200)                                                             //OK status code
    expect(response.header).toMatchObject({"content-type":"text/HTML"})          //check response header
    expect(response.text).toEqual("<html><body>Welcome to the World Wide Web!</body></html>")

})