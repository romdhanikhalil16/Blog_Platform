const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
    const { content, article, parent } = req.body;

    const newComment = await Comment.create({
        content,
        author: req.user.id,
        article,
        parent: parent || null
    });

    const populated = await newComment.populate('author', 'username');

    const io = req.app.get('io');
    io.to(article).emit('commentAdded', populated);

    res.status(201).json(populated);
};

exports.getComments = async (req, res) => {
    const { articleId } = req.params;

    const comments = await Comment.find({ article: articleId })
        .populate('author', 'username')
        .lean();

    // Nest comments
    const map = {};
    comments.forEach(c => map[c._id] = { ...c, children: [] });
    const tree = [];

    comments.forEach(c => {
        if (c.parent) {
            map[c.parent]?.children.push(map[c._id]);
        } else {
            tree.push(map[c._id]);
        }
    });

    res.json(tree);
};
