const Restaurant = require('../models/restaurant')

// GET all
exports.getAll = (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) res.json({message: 'could not find restaurant because: ' + err})
    console.log('getting all')
    res.render('home', {
      restaurants: restaurants
    })
  })
}
