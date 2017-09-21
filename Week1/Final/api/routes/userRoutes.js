'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');

  //set up users routes
  app.route('/users/:id')
    .get(user.getUserID)
    .delete(user.deleteUserID);

 app.route('/users')
    .post(user.postUser)
    .get(user.getAllUsers);
};