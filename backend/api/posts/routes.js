const express = require('express');
const postRouter = express();
const PostModel = require('./models');

postRouter.post('/', async (req, res) => {
    try {
        console.log(req.session);
        if (!req.session.admin) {
            res.status(403).json({
                message: "Unauthenticated",
            });
        } else {
            const postInfo = req.body;
            const newPost = await PostModel.create(postInfo);
            res.status(201).json(newPost);
        }
    } catch (error) {
        res.status(500).end(error.message);
    }
});

postRouter.get('/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const postInfo = await PostModel.findById(postId).
            populate({
                path: "admin",
                select: "fullName"
            }).
            exec();
        res.status(200).json(postInfo);
    } catch (error) {
        res.status(500).end(error.message);
    }
});

postRouter.get('/all/count', async (req, res) => {
    try {
        const data = await PostModel.find().exec();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).end(error.message);
    }
})

postRouter.get('/', async (req, res) => {
    try {
        const { pageNumber, pageSize } = req.query;
        const data = PostModel.find()
            .skip(pageSize * (pageNumber - 1))
            .limit(Number(pageSize))
            .exec();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).end(error.message);
    }
});

module.exports = postRouter;

