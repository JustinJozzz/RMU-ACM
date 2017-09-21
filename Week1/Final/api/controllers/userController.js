'use strict';
var userList = require('../../UserList');

exports.getAllUsers = function(req, res) {
  res.json(userList);
};

exports.getUserID = function(req, res) {
  var resArr = userList.filter(function(user) {
    return user.id == req.params.id;
  });
  res.json(resArr);
};

exports.postUser = function(req, res) { 
  try{
    userList.push(req.body)
    res.json({'response': 'yoyoyo'});
  }
  catch(err) {
    console.log(err);
    res.satus(400).json({'response': 'failed'});
  }
};

exports.deleteUserID = function(req, res) {
  try {
    userList = userList.filter(function(user) {
                  return user.id != req.params.id;
                });
    res.json({'response': 'Success'})
  }
  catch(err) {
    console.log(err);
    res.status(500).json({'response': 'failed'})
  }
};