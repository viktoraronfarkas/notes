const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {title: 'My Notes'});
})

router.get('/register', (req, res) => {
  res.render('register', {title: 'My Notes'});
})

router.get('/login', (req, res) => {
  res.render('login', {title: 'My Notes'});
})

module.exports = router;