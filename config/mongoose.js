var config = require('./config.js'),
mongoose = require('mongoose');

module.exports = function(){
  var db = mongoose.connect(config.db);

  require('../app/models/user.server.model.js');
  require('../app/models/repo.server.model.js');
  require('../app/models/message.server.model.js');
  require('../app/models/file.server.model.js');
  require('../app/models/discussion.server.model.js');

  return db;
};
