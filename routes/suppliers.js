// routes/supplier.js
const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier'); // Adjust the path as needed

// Get all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single supplier by ID
router.get('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (supplier) {
      res.json(supplier);
    } else {
      res.status(404).json({ error: 'Supplier not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new supplier
router.post('/', async (req, res) => {
  try {
    const { supplierName, contactName, address, city, postalCode, country, phone } = req.body;
    const newSupplier = await Supplier.create({ supplierName, contactName, address, city, postalCode, country, phone });
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an existing supplier by ID
router.put('/:id', async (req, res) => {
  try {
    const { supplierName, contactName, address, city, postalCode, country, phone } = req.body;
    const supplier = await Supplier.findByPk(req.params.id);
    if (supplier) {
      supplier.supplierName = supplierName;
      supplier.contactName = contactName;
      supplier.address = address;
      supplier.city = city;
      supplier.postalCode = postalCode;
      supplier.country = country;
      supplier.phone = phone;
      await supplier.save();
      res.json(supplier);
    } else {
      res.status(404).json({ error: 'Supplier not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a supplier by ID
router.delete('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (supplier) {
      await supplier.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Supplier not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
