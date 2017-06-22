require('dotenv').config()
var json = require('../restaurant.json')
var data = [json]

var seeder = require('mongoose-seed')

seeder.connect(process.env.MONGODB_URI, function () {
  //load mongoose models
  seeder.loadModels([
    'models/restaurant.js'
  ])

  // clear collections
  seeder.clearModels(['Restaurant'], function () {
    seeder.populateModels(data, function() {
      // disconnect
    })
  })
})
