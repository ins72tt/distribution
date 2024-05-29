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

//	NewRelease Page
router.get('/new', ensureAuthenticated, (req, res) =>
	res.render('new'));

module.exports = router;