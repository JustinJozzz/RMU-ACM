'use strict';

exports.get_say_hello = function(req, res) {
  res.json({message: 'hello '+req.params.name});
};

exports.post_say_hello = function(req, res) {
  res.json({message: 'hello '+req.body.name});
};