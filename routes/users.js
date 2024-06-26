//	The route of the users pages i.e ('/user/:id')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//	User model
const User = require('../models/User');

//	Login Page
router.get('/login', (req, res) => res.render('login'));

//	Register Page
router.get('/register', (req, res) => res.render('register'));

//	Register Page
router.get('/test', (req, res) => res.render('test'));

//	Register Page
router.get('/test2', (req, res) => res.render('test2'));

//	Register Page
router.get('/test3', (req, res) => res.render('test'));

//all other
router.get('*', (req, res) => res.render('welcom'));

//	Register Handle
router.post('/register', (req, res) => {
	const { name, email, password, password2 } = req.body;
	let errors = [];

	//	Check required fields
	if(!name || !email || !password || !password2){
		errors.push({ msg: 'Please fill in all fields'});
	}

	//	Check passwords match
	if(password !== password2){
		errors.push({ msg: 'Passwords do not match'});
	}

	//	Check password length
	if(password.length < 6){
		errors.push({ msg: 'Password should be at least 6 characters' });
	}

	if(errors.length > 0){
		res.render('register', {	//	ES6 object (key & value are the same)
			errors,
			name,
			email,
			password,
			password2
		});
	}else{
		//	Validation Passed
		User.findOne({ email: email })
			.then(user => {
				if(user){
					//	User Exists
					errors.push({ msg: 'Email is already registered' });
					res.render('register', {
						errors,
						name,
						email,
						password,
						password2
					});
				}else{
					const newUser = new User({
						name,
						email,
						password
					});

					//	Hash Password
					bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
						if(err)
							throw err;
						//	Set password to hashed
						newUser.password = hash;
						//	Save user
						newUser.save()
							.then(user => {
								req.flash('success_msg', 'You are now registered and can log in');
								res.redirect('/users/login');
							})
							.catch(err => console.log(err));
					}))
				}
			})
			.catch(err => console.log(err));
	}
	/* console.log(JSON.stringify(req.body, null, 2)); */
});

//	Login Handle
router.post('/login', (req, res, next) => {
	passport.authenticate('local', { 
		successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true 
    })(req, res, next);
});

//	Logout Handle
router.get('/logout', (req, res, next) => {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');
});

module.exports = router;