var express = require('express'),//require express to handle api requests
    app = express(),
    port = process.env.PORT || 3000, //sets the port to listen on
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());//these lines let server parse json and make it available in the req variable

var routes = require('./api/routes/userRoutes'); //importing route
routes(app); //register the route

app.listen(port);//listen for requests

console.log('acm RESTful API server started on: ' + port);