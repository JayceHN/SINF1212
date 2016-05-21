var mongoose = require('mongoose'),
crypto = require('crypto'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
  mail : {
    type: String,
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please fill a valid e-mail address"],
    required: 'mail is required'
  },
  password :{
    type: String,
    required: true,
    validate: [
      function(password) {
        return password.length >= 6;
      },'Password should be longer'
    ]
  },
  salt:{
    type: String
  },
  provider: {
    type: String,required: 'Provider is required'
  },
  providerId: String,
  providerData: {},
  created: {
    type: Date,
    default: Date.now
  },
  lastname : String,
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

UserSchema.virtual('fullname').get(function() {
  return this.firstname + ' ' + this.lastname;
}).set(function(fullname) {
  var splitname = fullname.split(' ');
  this.firstname = splitname[0] || '';
  this.lastname = splitname[1] || '';
});
UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),
    'base64');
    this.password = this.hashPassword(this.password);
  }next();
});

UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000,
    64).toString('base64');
};
UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};
// UserSchema.statics.findUniqueUsername = function(username, suffix,callback) {
//   var _this = this;
//   var possibleUsername = username + (suffix || '');
//   _this.findOne({
//     username: possibleUsername
//   }, function(err, user) {
//     if (!err) {
//       if (!user) {
//         callback(possibleUsername);
//       } else {
//         return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
//       }
//     } else {
//       callback(null);
//     }
//   });
// };
UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

UserSchema.statics.findOneByMail = function (mail, callback){
  this.findOne({ mail: new RegExp(mail, 'i') }, callback);
};

mongoose.model('User', UserSchema);