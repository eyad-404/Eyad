const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Product price cannot be negative']
  },
  country: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return typeof v === 'string' && !v.includes('$') && !v.includes('.');
      },
      message: props => `${props.value} is not a valid country name`
    }
  },
  image: {
    type: String,
    required: [true, 'Product image is required'],
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  unitsLeft: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Units left cannot be negative']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  strict: true 
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
module.exports = Product;
