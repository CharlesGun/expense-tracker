const express = require('express');
const router = express.Router();
const controllers = require('../controllers/authentication.controller');
const validator = require('../middlewares/validator')
const {registerSchema, loginSchema} = require('../validators/auth.validator');

router.post('/login', validator(loginSchema), controllers.login);
router.post('/register', validator(registerSchema), controllers.register);
// router.post('/logout', controllers.logout);
// router.post('/refresh', controllers.refresh);

module.exports = router;