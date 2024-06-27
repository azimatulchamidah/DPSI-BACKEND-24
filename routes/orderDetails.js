// routes/orderDetail.js
const express = require('express');
const router = express.Router();
const OrderDetail = require('../models/orderDetail'); // Adjust the path as needed
const Order = require('../models/order');
const Product = require('../models/products');

// Get all order details
router.get('/', async (req, res) => {
  try {
    const orderDetails = await OrderDetail.findAll({ include: [Order, Product] });
    res.json(orderDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single order detail by ID
router.get('/:id', async (req, res) => {
  try {
    const orderDetail = await OrderDetail.findByPk(req.params.id, { include: [Order, Product] });
    if (orderDetail) {
      res.json(orderDetail);
    } else {
      res.status(404).json({ error: 'OrderDetail not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new order detail
router.post('/', async (req, res) => {
  try {
    const { orderID, productID, quantity } = req.body;
    const newOrderDetail = await OrderDetail.create({ orderID, productID, quantity });
    res.status(201).json(newOrderDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an existing order detail by ID
router.put('/:id', async (req, res) => {
  try {
    const { orderID, productID, quantity } = req.body;
    const orderDetail = await OrderDetail.findByPk(req.params.id);
    if (orderDetail) {
      orderDetail.orderID = orderID;
      orderDetail.productID = productID;
      orderDetail.quantity = quantity;
      await orderDetail.save();
      res.json(orderDetail);
    } else {
      res.status(404).json({ error: 'OrderDetail not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an order detail by ID
router.delete('/:id', async (req, res) => {
  try {
    const orderDetail = await OrderDetail.findByPk(req.params.id);
    if (orderDetail) {
      await orderDetail.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'OrderDetail not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
