const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catalogueSchema = new Schema({

  files: [{
    public_id: String,
    url: String
  }]
});

module.exports = mongoose.model('Catalogue', catalogueSchema);
