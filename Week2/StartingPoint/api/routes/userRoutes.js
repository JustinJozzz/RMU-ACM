/*
All of the routes are here. To access these go to local:3000/routename
e.g. localhost:3000/users to get a list of users
*/
'use strict';
module.exports = function(app) {
  var userControl = require('../controllers/userController');
  var authControl = require('../controllers/authController');

  //These routes do not check auth tokens
  app.route('/signup')
     .post(userControl.createUser);

  app.route('/login')
     .post(userControl.signIn);

  //verify auth token for all routes below this point
  app.use(authControl.verifyToken);

  //get a list of all users
  app.route('/users')
     .get(userControl.getAllUsers);
};