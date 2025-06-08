const Analytics = require('../Models/analyticsSchema');
const Order = require('../Models/orderSchema');

async function handlePurchase(req, res) {
  const { products, totalPrice, paymentMethod, userId, username } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: 'Products list is empty or invalid' });
  }

  if (!userId || !username) {
    return res.status(400).json({ error: 'Missing user information' });
  }

  try {
    const updateOps = products.map(item => {
      if (!item.country || !item.quantity) {
        console.warn('Missing country or quantity in item:', item);
        return null;
      }

      console.log(`Updating ${item.country} by +${item.quantity}`);
      return Analytics.updateOne(
        { country: item.country },
        { $inc: { purchases: item.quantity } },
        { upsert: true }
      );
    });

    await Promise.all(updateOps.filter(Boolean));

    const newOrder = new Order({
      userId,
      username,
      products,
      totalPrice,
      paymentMethod
    });

    await newOrder.save();

    res.status(200).json({ message: 'Order placed successfully and analytics updated' });
  } catch (error) {
    console.error("Error saving order or updating analytics:", error);
    res.status(500).json({ error: 'Failed to place order' });
  }
}

module.exports = handlePurchase;
