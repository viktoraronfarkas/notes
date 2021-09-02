const db = require('../services/database.js').config;

function getNotesOfUser (uid, cb) {
  db.query("SELECT * FROM ccl2_notes WHERE user_id = " + uid, function(err, notes, fields) {
    if(err) {
      cb(err, null)
    }
    cb(null, notes);
  });
}

function updateNote(noteData, cb) {
  let sql = "UPDATE ccl2_notes SET" +
    " title = "+ db.escape(noteData.title) +
    ", text = "+ db.escape(noteData.text) +
    " WHERE id = " + parseInt(noteData.id);
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

async function addNote(uid, cb) {
  let sql = `INSERT INTO ccl2_notes (user_id, title, text) VALUES (${uid}, 'Untitled', '')`;
  db.query(sql, function (err, result, fields) {
    if (err) {
      cb(err);
    } else {
      console.log(result.affectedRows + " rows have been affected!");
      cb(null);
    }
  })
}

function deleteNote(id, cb) {
  let sql = 'DELETE from ccl2_notes WHERE id=' + id;
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

module.exports = {
  getNotesOfUser,
  updateNote,
  addNote,
  deleteNote,
}