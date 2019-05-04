const mongoose = require('mongoose');
//title
//content
//image
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
});

const PostModel = mongoose.model('Post',PostSchema);

module.exports = PostModel;