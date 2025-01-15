const express = require('express');
const router = express.Router();
const {registerUsers} = require('../controllers/auth');

router.route('/register').post(registerUsers);

module.exports = router;