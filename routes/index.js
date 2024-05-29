//	The route of the home page i.e ('/dashboard')
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//	Welcome Page
router.get('/', (req, res) => res.render('welcom'));

//	Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
	res.render('dashboard', {
		name: req.user.name
	}));

// Route to serve the new form page
router.get('/new', (req, res) => {
    res.render('new');
});

// Route to handle form submission
router.post('/new', (req, res) => {
    const { title, description } = req.body;
    // You can add logic here to save the data to a database, etc.
    res.send(`Form submitted! Title: ${title}, Description: ${description}`);
});

module.exports = router;