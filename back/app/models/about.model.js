const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutSchema = new Schema({

  files: [{
    public_id: String,
    url: String
  }]
});

module.exports = mongoose.model('About', aboutSchema);
