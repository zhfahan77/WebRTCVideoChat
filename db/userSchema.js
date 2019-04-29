const mongoose = require("mongoose")
crypto = require('crypto')
let jwt = require('jsonwebtoken')
require('dotenv').config()

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type : String,
    default : ''
  },
  salt: {
    type : String,
    default : ''
  }
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    username : this.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.SECRET);
};

userSchema.methods.generateToken = function() {
  return crypto.randomBytes(64).toString('hex');
}

mongoose.model('User', userSchema, 'user')