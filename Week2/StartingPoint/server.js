/*
This file starts up the server that will take HTTP requests.
The server is bound to a port on your local machine, default is 3000.
*/

var express = require('express'),//require express to handle api requests
    app = express(),
    port = process.env.PORT || 3000, //sets the port to listen on
    bodyParser = require('body-parser');

var mongoose   = require('mongoose');
var config = require('./config');

mongoose.connect(config.database, //from config.js file
                { useMongoClient: true });//this connects to the database.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());//these lines let server parse json and make it available in the req variable

var routes = require('./api/routes/userRoutes'); //importing route
routes(app); //register the route

app.listen(port);//listen for requests

console.log('acm RESTful API server started on: ' + port);