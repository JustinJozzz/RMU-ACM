'use strict';
module.exports = function(app) {
  var userControl = require('../controllers/userController');
  var authControl = require('../controllers/authController')

  //set up users routes
  app.route('/signup')
     .post(userControl.createUser);

  app.route('/login')
     .post(userControl.signIn);

  //verify auth token for all routes below this point
  app.use(authControl.verifyToken);

  app.route('/users')
     .get(userControl.getAllUsers);
};