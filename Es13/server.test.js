const express = require('express');
const app = require('./server');
const supertest = require('supertest');

const request = supertest(app)

test('GET /', async()=>{
    const response = await request
        .get('/')
        .expect(200)
        .expect("Content-Type", /application\/json/)
    expect(response.body).toEqual({res:'ciao'})
    done();
})