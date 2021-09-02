const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const noteModel = require('../models/noteModel');
const ACCESS_TOKEN_SECRET = require('../secrets').auth_token_secret;

function authenticateUser({email, password}, users, res) {
  const user = users.find(u => {
    return u.email === email;
  });

  if (user && checkPassword(password, user.password)) {
    // Generate an access token
    const accessToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, ACCESS_TOKEN_SECRET);
    res.cookie('accessToken', accessToken);
    res.redirect('/app');
  } else {
    res.send('Username or password incorrect');
  }
}

function authenticateJWT(req, res, next) {
  const token = req.cookies['accessToken'];

  if (token) {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.redirect('/login');
  }
}

function getUserFromJWT(req, res, next) {
  const token = req.cookies['accessToken'];

  if (token) {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.redirect('/login');
  }
}

function getNotesFromJWT (req, res, next) {
  const token = req.cookies['accessToken'];

  if (token) {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      noteModel.getNotesOfUser(user.id, (req, res) => {
        user.notes = req;
      });
    })
  } else {}
}

async function checkPassword(password, hash) {
  let pw = await bcrypt.compare(password, hash);
  return pw;
}

module.exports = {
  authenticateUser,
  authenticateJWT,
  getUserFromJWT,
  getNotesFromJWT,
};