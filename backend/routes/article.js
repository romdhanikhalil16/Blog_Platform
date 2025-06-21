const express = require('express');
const router = express.Router();
const controller = require('../controllers/articleController');
const { authenticate } = require('../middlewares/auth');

router.post('/', authenticate, controller.createArticle);
router.get('/', controller.getAllArticles);
router.put('/:id', authenticate, controller.updateArticle);
router.delete('/:id', authenticate, controller.deleteArticle);

module.exports = router;
