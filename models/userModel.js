const db = require('../services/database.js').config;
const bcrypt = require('bcrypt');

function getUsers(cb) {
  db.query("SELECT * FROM ccl2_users", function (err, users, fields) {
    if (err) {
      cb(err)
    } else {
      cb(null, users);
    }
  });
}

function getUser(uid, cb) {
  db.query("SELECT * FROM ccl2_users WHERE id = " + uid, function(err, users, fields) {
    if(err) {
      cb(err, null)
    }
    let user = users[0];
    cb(null, user)
  })
}

function updateUser(userData, cb) {
  let sql = "UPDATE ccl2_users SET" +
    " name = "+ db.escape(userData.name) +
    ", email = "+ db.escape(userData.email) +
    " WHERE id = " + parseInt(userData.id);
  console.log(sql);
  db.query(sql, function (err, result, fields) {
    if (err) {
      cb(err)
    } else {
      console.log(result.affectedRows + " rows have been affected!");
      cb(null, userData);
    }
  })
}

async function updatePassword(pwData, cb) {
  let pw = await bcrypt.hash(pwData.pw, 10);

  let sql = "UPDATE ccl2_users SET password = " +
    db.escape(pw) +
    "WHERE id = " +
    parseInt(pwData.id);
  console.log(sql);
  db.query(sql, function (err, result, fields) {
    if (err) {
      cb(err)
    } else {
      console.log(result.affectedRows + " rows have been affected!");
      cb(null);
    }
  })
}

function deleteUser(uid, cb) {
  let sql = 'DELETE from ccl2_users WHERE id=' + uid;
  console.log(sql);
  db.query(sql, function (err, result, fields) {
    if (err) {
      cb(err)
    } else {
      console.log(result.affectedRows + " rows have been affected!");
      cb(null);
    }
  })
}

async function addUser(cb, userData) {
  let pw = await bcrypt.hash(userData.password, 10);
  let sql = "INSERT INTO ccl2_users (name, email, password) VALUES (" +
    db.escape(userData.name) + ", " +
    db.escape(userData.email) + ", " +
    db.escape(pw) + ")";
  db.query(sql, function (err, result, fields) {
    if (err) {
      cb(err);
    } else {
      console.log(result.affectedRows + " rows have been affected!");
      cb(null, userData);
    }
  })
}

module.exports = {
  getUsers,
  getUser,
  updateUser,
  addUser,
  deleteUser,
  updatePassword,
}
