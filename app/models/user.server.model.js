var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
  mail : {
    type: String,
    unique: true,
    trim: true,
    match: /.+\@.+\..+/,
    required: true
  },
  password :{
    type: String,
    required: true
    
  },
  name : String,
  firstname : String,
  description : String,
  // photo maybe
  repertory : String,
  friend_list : [String],
  permission : {
    type: String,
    enum: ['Admmin', 'Owner', 'User']
  },
  created: {
    type: Date,
    default: Date.now
  }
});
UserSchema.statics.findOneByMail = function (mail, callback){
this.findOne({ mail: new RegExp(mail, 'i') }, callback);
};
UserSchema.methods.authenticate = function(password){
return this.password === password;
};


mongoose.model('User', UserSchema);
