const userModel = require('../models/userModel');

function getUsers(req, res, next) {
  userModel.getUsers((err, users) => {
    if (err) {
      res.status(500); //this is just for error handling
      next(err);
    }
    res.render('users', {users});
  });
}

function getUser(req, res, next) {
  userModel.getUser(req.params.uid, (err, user) => {
    if (err) {
      res.status(500) //this is just for error handling
      next(err);
    }
    res.render('user', {user});
  })
}

function editUser(req, res, next) {
  userModel.getUser(req.params.uid, (err, user) => {
    if(err) {
      res.status(500);
      next(err)
    }
    res.render('editUser', {user})
  });
}

function deleteUser(req, res, next) {
  userModel.deleteUser(req.params.uid, (err) => {
    if (err) {
      res.sendStatus(500) //this is just for error handling
    }
    res.redirect('/users')
  });
}

function updateUser(req, res, next) {
  userModel.updateUser((err, user) => {
    if(err) {
      res.status(500);
      next(err);
    }
    res.render('user', {user})
  }, req.body)
}

function addUser(req, res, next) {
  userModel.addUser((err, user) => {
    if (err) {
      res.status(500);
      next(err);
    }
    res.render('user', {user});
  }, req.body)
}

module.exports = {
  getUsers,
  getUser,
  editUser,
  updateUser,
  addUser,
  deleteUser,
}