const express = require('express');
const router = express.Router();
const controller = require('../controllers/commentController');
const { authenticate } = require('../middlewares/auth');

router.post('/', authenticate, controller.createComment);
router.get('/:articleId', controller.getComments);

module.exports = router;
