const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const User = require ('./User');

const bookmarks = new mongoose.Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  // ^ to ref mongoDB reference of the user
  eateryid: { type: String, unique: true },
  address: {
    street: String,
    unit: Number,
    postalcode: String
  },
  contactnumber: String,
  area: String,
  cuisine: String,
  operatinghours: String,
  // bookmarked: true

});

module.exports = bookmarks;
