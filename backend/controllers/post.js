const Post = require("../models/post");
const User= require("../models/user");

const registerPost = async(req,res) =>{
    if(!req.body.text) return res.status(400).send("Incomplete Data");

    const post = new Post({
        userId: req.user._id,
        text: req.body.text,
        hastag: req.body.hastag,
        dbStatus: true,
    });

    const result = await post.save();
    if(!result) return res.status(400).send("Failed to register Post");

    return res.status(200).send({result});
};

const listPost = async(req,res) =>{
    const post = await Post.find({userId: req.user._id});
    if(!post|| post.length ==="") return res.status(400).send("No Posts");
    return res.status(200).send({post});
};

module.exports = { registerPost, listPost};