var posts = require('../../app/controllers/Post.server.controller.js');
module.exports = function(app) {
  app.route('/posts')
  .post(posts.create)
  .get(posts.list);

  app.route('/posts:postId')
  .get(posts.read)
  .put(posts.update)
  .delete(posts.delete);
  app.param('postId', posts.postByID);
};
