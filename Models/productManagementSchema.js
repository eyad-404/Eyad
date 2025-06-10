const mongoose = require('mongoose');

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
      validator: (value) => {
        return typeof value === 'string' && !value.includes('$') && !value.includes('.');
      },
      message: 'Invalid country name'
    }
  },
  image: {
    type: String,
    required: [true, 'Product image is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true // not required but still cleaned
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
  strict: true // prevent adding unexpected fields like $where
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
module.exports = Product;
