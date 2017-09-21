'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');

  //set up users routes
  app.route('/users/:id')
    .get(user.getUserID);

 app.route('/users')
    .get(user.getAllUsers);
};