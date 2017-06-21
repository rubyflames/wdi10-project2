const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new mongoose.Schema({
  formatted_address: String,
  geometry: {
    location: {
      lat: Number,
      lng: Number
    },
    viewport: {
      northeast:{
        lat: Number,
        lng: Number
      },
      southwest: {
        lat: Number,
        lng: Number
      }
    }
  },
  icon: String,
  id: String,
  name: String,
  opening_hours: {
    open_now: Boolean,
    weekday_text: []
  },
  photos: [
    {
      height: Number,
      html_attributions: [String],
      photo_reference: String,
      width: Number
    }
  ],
  place_id: String,
  rating: Number,
  reference: String,
  types: []
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant
