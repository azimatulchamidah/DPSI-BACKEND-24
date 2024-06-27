// routes/customer.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer'); // Adjust the path as needed

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new customer
router.post('/', async (req, res) => {
  try {
    const { customerName, contactName, address, city, postalCode, country } = req.body;
    const newCustomer = await Customer.create({ customerName, contactName, address, city, postalCode, country });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an existing customer by ID
router.put('/:id', async (req, res) => {
  try {
    const { customerName, contactName, address, city, postalCode, country } = req.body;
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      customer.customerName = customerName;
      customer.contactName = contactName;
      customer.address = address;
      customer.city = city;
      customer.postalCode = postalCode;
      customer.country = country;
      await customer.save();
      res.json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a customer by ID
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      await customer.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
