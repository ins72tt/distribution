//	The route of the home page i.e ('/dashboard')
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// ensureAuthenticated makes sure user is logged in when viewing
//	Welcome Page
router.get('/', (req, res) => res.render('welcome'));

//	Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
	res.render('dashboard', {
		name: req.user.name
	}));

router.get('/shop', (req, res) =>
    res.render('shop', {
        user: req.user
    })
);

router.get('/1', ensureAuthenticated, (req, res) =>
    res.render('1', {
        user: req.user
    })
);

router.get('/user', ensureAuthenticated, (req, res) =>
    res.render('user', {
        user: req.user
    })
);

module.exports = router;