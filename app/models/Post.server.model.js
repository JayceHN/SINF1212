var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Post', PostSchema);

// var user = new User();
// user.save();
// var post = new Post();
// post.author = user;
// post.save();
