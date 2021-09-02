const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const noteModel = require('../models/noteModel');
const authenticationService = require('../services/authentication');

router.get('/', (req, res) => {
  res.redirect('/register');
});

router.get('/register', (req, res) => {
  if (req.cookies['accessToken']) {
    res.redirect('/app');
  } else {
    res.render('register', {title: 'Sign up | My Notes'});
  }
});

router.post('/register', (req, res) => {
  userModel.addUser((err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.redirect('/login');
  }, req.body);
});

router.route('/login')
  .get((req, res) => {
    if (req.cookies['accessToken']) {
      res.redirect('/app');
    } else {
      res.render('login', {title: 'Log in | My Notes'});
    }
  })
  .post((req, res) => {
    userModel.getUsers((err, users) => {
      if (err) {
        res.sendStatus(500);
      }
      authenticationService.authenticateUser(req.body, users, res)});
  });

router.get('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.redirect('/login');
});

router.get('/app', (req, res) => {
  if (req.user) {
    noteModel.getNotesOfUser(req.user.id, (err, notes) => {
      res.render('app', {user: req.user, notes: notes});
    });
  } else {
    res.redirect('/login');
  }
});

router.post('/app', (req, res) => {
  noteModel.updateNote(req.body, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.locals.note = req.body.id;
    res.redirect('back');
  })
});

router.get('/app/new', (req,res) => {
  noteModel.addNote(req.user.id, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.redirect('back');
  });
});

router.get('/app/delete', (req, res) => {
  noteModel.deleteNote(req.query.id, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.redirect('back');
  });
});

router.get('/account', (req, res) => {
  res.redirect('/account/details');
});

router.get('/account/details', (req, res) => {
  authenticationService.getUserFromJWT(req, res, () => {
    res.render('account/details', {
      user: req.user.name,
      email: req.user.email,
    });
  })
});

router.get('/account/danger-zone', (req, res) => {
  authenticationService.getUserFromJWT(req, res, () => {
    res.render('account/danger-zone', {user: req.user.name});
  })
});

router.get('*', (req, res) => {
  res.render('404', {title: 'Page not found | My notes'})
})

module.exports = router;