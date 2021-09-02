const noteModel = require('../models/noteModel');

function getNotesOfUser(req, res, next) {
  noteModel.getNotesOfUser((err, notes) => {
    if (err) {
      res.status(500);
      next(err);
    }
    res.render('app', {notes});
  });
}

module.exports = {
  getNotesOfUser,
}