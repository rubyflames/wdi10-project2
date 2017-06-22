const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('./User');
const restaurant = require('./restaurant');
const Schema = mongoose.Schema;
//const User = require ('./User');

const bookmarkSchema = new mongoose.Schema({
  user: String,
  // ^ to ref mongoDB reference of the user
  restaurant: String,
  name: String,
  formatted_address: String
  // bookmarked: true

});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

module.exports = Bookmark;
