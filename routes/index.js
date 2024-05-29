const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { ensureAuthenticated } = require('../config/auth');
const FormData = require('../models/FormData');

// Welcome Page
router.get('/', (req, res) => res.render('welcom'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        name: req.user.name
    }));

// Form Page
router.get('/new', ensureAuthenticated, (req, res) => 
    res.render('test2'));

router.post('/submit-form', ensureAuthenticated, async (req, res) => {
  try {
    const formData = new FormData(req.body);
    await formData.save();
    console.log('Form data saved successfully.');
    return res.status(200).json({ success: true, message: 'Form data saved successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Error saving form data.' });
  }
});

module.exports = router;
