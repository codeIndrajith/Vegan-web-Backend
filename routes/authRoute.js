const express = require('express');
const router = express.Router();
const {registerUsers, login, logout} = require('../controllers/auth');

router.route('/register').post(registerUsers);
router.route('/login').post(login);
router.route('/logout').get(logout);

module.exports = router;