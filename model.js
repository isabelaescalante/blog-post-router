const uuid = require('uuid');

let postsDB = [
  {
    id: uuid.v4(),
    title: "My blog post",
    content: "This is the first post made in the blog",
    author: "Isabela",
    publishDate: "March 23, 2019"
  },
  {
    id: uuid.v4(),
    title: "My second post",
    content: "This is the second post made in the blog",
    author: "Paulina",
    publishDate: "March 24, 2019"
  },
  {
    id: uuid.v4(),
    title: "My third post",
    content: "This is the third post made in the blog",
    author: "Isabela",
    publishDate: "March 24, 2019"
  }
];

const ListPosts = {
  get : function() {
    return postsDB;
  },
  getAuthor : function(author) {
    let postsByAuthor = [];

    postsDB.forEach(post => {
      if(author == post.author) {
        postsByAuthor.push(post);
      }
    });

    return postsByAuthor;
  },
  post : function(newTitle, newContent, newAuthor, newPublishDate) {
    let newPost = {
      id: uuid.v4(),
      title: newTitle,
      content: newContent,
      author: newAuthor,
      publishDate: newPublishDate
    };

    postsDB.push(newPost);

    return newPost;
  },
  delete : function(id) {
    for(var i = 0; i < postsDB.length; i++) {
      if(postsDB[i].id == id) {
        postsDB.splice(i, 1);
        return true;
      }
    }

    return false;
  },
  put : function(id, postBody) {
    var updated = false;

    postsDB.forEach(post => {
      if(post.id == id) {
        if(postBody.title) {
          post.title = postBody.title;
          updated = true;
        }
        if(postBody.content) {
          post.content = postBody.content;
          updated = true;
        }
        if(postBody.author) {
          post.author = postBody.author;
          updated = true;
        }
        if(postBody.publishDate) {
          post.publishDate = postBody.publishDate;
          updated = true;
        }
      }
    });

    return updated;
  }
};

module.exports = {ListPosts};
