const express = require('express');
const router = express.Router();
const {ListPosts} = require('./model');

//GET all posts
router.get('/blog-posts', (req, res, next) => {
  let allPosts = ListPosts.get();
  if(allPosts) {
    res.status(200).json({
      message : "Success: sent the list of blog posts",
      status : 200,
      posts : allPosts
    });
  }
  else {
    res.status(500).json({
      message : 'Internal server error',
      status : 500
    }).send("Finish");
  }
});

// GET by author requests
router.get('/blog-posts/:author', (req, res, next) => {

  if(!(req.params.author)) {
    res.status(406).json({
      message: "No author name received",
      status: 406
    });
    return next();
  }

  let authorName = req.params.author;

  let postsAuthor = ListPosts.getAuthor(authorName);

  if(postsAuthor.length > 0) {
    res.status(200).json({
      message : "Success: posts with this author exist",
      status : 200,
      post : postsAuthor
    });
  }
  else {
    res.status(404).json({
      message : "Blog posts not found with this author",
      status : 404
    });
    next();
  }
});

//POST new post
router.post('/blog-posts', (req, res, next) => {
  let requiredFields = ['title', 'content', 'author', 'publishDate'];

  for(let i = 0; i < requiredFields.length; i++) {
    let currentField = requiredFields[i];
    if(!(currentField in req.body)) {
      return res.status(406).json({
        message : `Missing field ${currentField} in body`,
        status : 406
      });
    }
  }

  let objectToAdd = ListPosts.post(req.body.title, req.body.content, req.body.author, req.body.publishDate);

  res.status(201).json({
    message : "Success: Added blog post",
    status : 201,
    objectToAdd
  });
});

//DELETE a post
router.delete('/blog-posts/:id', (req, res, next) => {
  let postID = req.params.id;
  let postBodyID = req.body.id;

  if(!postID || !postBodyID || postID != postBodyID) {
    res.status(406).json({
      message: "No ID received",
      status: 406
    });
  }

  let deleted = ListPosts.delete(postID);

  if(deleted){
    res.status(204).json({
      message : "post deleted",
      status : 204
    });
  }
  else {
    res.status(404).json({
      message : "ID not found in posts",
      status : 404
    });
    next();
  }
});

router.put('/blog-posts/:id', (req, res, next) => {
  let posts = ListPosts.get();
  let postID = req.params.id;

  if(!postID) {
    res.status(406).json({
      message: "No ID received",
      status: 406
    });
    next();
  }

  let postBody = req.body;
  let blogPost;

  let update = ListPosts.put(postID, postBody);

  if(update) {
    posts.forEach(post => {
      if(post.id == postID) {
        blogPost = post;
      }
    });
    res.status(200).json({
      message: "Success: Blog post was updated",
      status: 200,
      post: blogPost
    });
  }
  else {
    res.status(404).json({
      message: "No fields updated",
      status: 404
    });
    next();
  }

});

module.exports = router;
