const Article = require('../models/Article');

exports.createArticle = async (req, res) => {
    const { title, content, image, tags } = req.body;
    const article = await Article.create({
        title,
        content,
        image,
        tags,
        author: req.user.id
    });
    res.status(201).json(article);
};

exports.getAllArticles = async (req, res) => {
    const articles = await Article.find().populate('author', 'username email');
    res.json(articles);
};

exports.updateArticle = async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (!article) return res.sendStatus(404);

    const isAuthor = article.author.equals(req.user.id);
    const isEditorOrAdmin = ['Editor', 'Admin'].includes(req.user.role);

    if (!(isAuthor || isEditorOrAdmin)) return res.sendStatus(403);

    Object.assign(article, req.body);
    await article.save();
    res.json(article);
};

exports.deleteArticle = async (req, res) => {
    if (req.user.role !== 'Admin') return res.sendStatus(403);

    await Article.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
};
