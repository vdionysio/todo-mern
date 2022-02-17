const express = require('express');
const controller = require('../controllers/UserController');
const { validateJWT } = require('../middlewares');

const router = express.Router();

router.post('/', controller.create);
router.get('/', validateJWT, controller.getByToken);

module.exports = router;
