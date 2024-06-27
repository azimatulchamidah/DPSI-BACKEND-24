// routes/shipper.js
const express = require('express');
const router = express.Router();
const Shipper = require('../models/shipper'); // Adjust the path as needed

// Get all shippers
router.get('/', async (req, res) => {
  try {
    const shippers = await Shipper.findAll();
    res.json(shippers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single shipper by ID
router.get('/:id', async (req, res) => {
  try {
    const shipper = await Shipper.findByPk(req.params.id);
    if (shipper) {
      res.json(shipper);
    } else {
      res.status(404).json({ error: 'Shipper not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new shipper
router.post('/', async (req, res) => {
  try {
    const { shipperName, phone } = req.body;
    const newShipper = await Shipper.create({ shipperName, phone });
    res.status(201).json(newShipper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an existing shipper by ID
router.put('/:id', async (req, res) => {
  try {
    const { shipperName, phone } = req.body;
    const shipper = await Shipper.findByPk(req.params.id);
    if (shipper) {
      shipper.shipperName = shipperName;
      shipper.phone = phone;
      await shipper.save();
      res.json(shipper);
    } else {
      res.status(404).json({ error: 'Shipper not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a shipper by ID
router.delete('/:id', async (req, res) => {
  try {
    const shipper = await Shipper.findByPk(req.params.id);
    if (shipper) {
      await shipper.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Shipper not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
