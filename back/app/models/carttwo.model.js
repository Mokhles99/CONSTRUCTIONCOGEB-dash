const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
});

const userInfoSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  message: { type: String }
});

const cartSchema = new Schema({
  cartId: {
    type: String,
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  userInfo: userInfoSchema // Embedding userInfo schema in the cart schema
});

module.exports = mongoose.model('Carttwo', cartSchema);
