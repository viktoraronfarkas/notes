const express = require('express');
const router = express.Router();
const authenticationService = require('../services/authentication');
const noteController = require('../controllers/noteController');

router.use(authenticationService.authenticateJWT);

module.exports = router;