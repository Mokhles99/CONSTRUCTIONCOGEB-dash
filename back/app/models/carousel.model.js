const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carouselSchema = new Schema({

  files: [{
    public_id: String,
    url: String
  }]
});

module.exports = mongoose.model('Carousel', carouselSchema);
