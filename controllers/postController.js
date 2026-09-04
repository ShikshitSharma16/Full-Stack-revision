import Post from "../models/postModels.js";

const createPost = async (request, response)=> {
    const post = await Post.create(request.body);

    response.status(201).json(post);
};

const getPosts = async (request, response)=> {
    const posts = await Post.find().populate("author");

    response.json(posts);
}
export { createPost, getPosts };