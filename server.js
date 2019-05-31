const express = require('express');

const router = require('./router.js');

const server = express ();

server.use(express.json());

server.use('/api/projects', router)

server.get('/'), (req,res) => {
    res.send('<h2>Welcome to the webapi-challenge!</h2>')
}

module.exports=server;