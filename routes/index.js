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

	router.get('/new_release', ensureAuthenticated, (req, res) => 
	res.render('new', {
		name: req.user.name
	}));

module.exports = router;