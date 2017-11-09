const express = require('express')
const bodyParser = require('body-parser')
var mongoose = require('mongoose')
const request = require('request')
var config = require('../config')

mongoose.connect("mongodb://" + config.config.username + ":" + config.config.password + "@ds157667.mlab.com:57667/sof1db");

const app = express()
app.use(bodyParser.json())

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);
    next();//
});

require('./scraper')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
