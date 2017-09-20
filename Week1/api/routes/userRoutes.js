'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');

  //set up users routes
  app.route('/users/:name')
    .get(user.get_say_hello);

 app.route('/users')
    .post(user.post_say_hello);
};