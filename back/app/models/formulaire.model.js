const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({


    name: { 
    type: String,
     required: true
     },
  surname: { 
    type: String, 
    required: true
 },
  email: {
     type: String,
      required: false
     },
  number: {
     type: String,
      required: true
     },
  notes: {
     type: String,
      required: false
     }
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
