// routes/employee.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/employee'); // Adjust the path as needed

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new employee
router.post('/', async (req, res) => {
  try {
    const { lastName, firstName, birthDate, photo, notes } = req.body;
    const newEmployee = await Employee.create({ lastName, firstName, birthDate, photo, notes });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an existing employee by ID
router.put('/:id', async (req, res) => {
  try {
    const { lastName, firstName, birthDate, photo, notes } = req.body;
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      employee.lastName = lastName;
      employee.firstName = firstName;
      employee.birthDate = birthDate;
      employee.photo = photo;
      employee.notes = notes;
      await employee.save();
      res.json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      await employee.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
