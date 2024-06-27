// routes/order.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Adjust the path as needed
const Customer = require('../models/Customer');
const Employee = require('../models/employee');
const Shipper = require('../models/shipper');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [Customer, Employee, Shipper] });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: [Customer, Employee, Shipper] });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { customerID, firstName, employeeID, orderDate, shipperID } = req.body;
    const newOrder = await Order.create({ customerID, firstName, employeeID, orderDate, shipperID });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an existing order by ID
router.put('/:id', async (req, res) => {
  try {
    const { customerID, firstName, employeeID, orderDate, shipperID } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (order) {
      order.customerID = customerID;
      order.firstName = firstName;
      order.employeeID = employeeID;
      order.orderDate = orderDate;
      order.shipperID = shipperID;
      await order.save();
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      await order.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
