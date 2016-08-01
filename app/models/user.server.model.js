var mongoose = require('mongoose'),
crypto = require('crypto'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
  mail : {
    type: String,
    unique: true,
    // trim modifier avoid spaces
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
  pseudo : {
    type: String,
    unique: true,
    trim: true,
    required : true
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
  friend_list : [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  permission : {
    type: String,
    enum: ['Admmin', 'Owner', 'User']
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// UserSchema.virtual('fullname').get(function() {
//   return this.firstname + ' ' + this.lastname;
// }).set(function(fullname) {
//   var splitname = fullname.split(' ');
//   this.firstname = splitname[0] || '';
//   this.lastname = splitname[1] || '';
// });

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
UserSchema.statics.findUniquePseudo = function(pseudo, suffix,callback) {
  var _this = this;
  var possiblePseudo = pseudo + (suffix || '');
  _this.findOne({
    pseudo: possiblePseudo
  }, function(err, user) {
    if (!err) {
      if (!user) {
        callback(possiblePseudo);
      } else {
        return _this.findUniquePseudo(pseudo, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};
UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

UserSchema.statics.findOneByMail = function (mail, callback){
  this.findOne({ mail: new RegExp(mail, 'i') }, callback);
};
UserSchema.statics.findOneByPseudo = function (mail, callback){
  this.findOne({ pseudo: new RegExp(pseudo, 'i') }, callback);
};


mongoose.model('User', UserSchema);
