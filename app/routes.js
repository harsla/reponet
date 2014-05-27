/*jslint node: true */
"use strict";

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()) {
        return next();
    }
		

	// if they aren't redirect them to the home page
	res.redirect('/');
}

module.exports = function (app, passport) {

  // homepage
	app.get('/', function (req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	 //login page
    app.get('/login', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
	app.post('/login', passport.authenticate('local-login', {
		//successRedirect : '/profile', // redirect to the secure profile section
        successRedirect : '/dashboard', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

  //signup page
	app.get('/signup', function (req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

  // process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		//successRedirect : '/profile', // redirect to the secure profile section
        successRedirect : '/dashboard', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

    //profile (req. auth)
	app.get('/profile', isLoggedIn, function (req, res) {
		res.render('profile.ejs', {
			user : req.user
		});
	});

    //dashboard (req. auth)
    app.get('/dashboard', isLoggedIn, function (req, res) {
        res.render('dashboard.ejs', {
            user : req.user
        });
    });

    //order (req. auth)
    app.get('/view_order', isLoggedIn, function (req, res) {
        res.render('view_order.ejs', {
            user : req.user
        });
    });
    
    //order (req. auth)
    app.get('/create_order', isLoggedIn, function (req, res) {
        res.render('create_order.ejs', {
            user : req.user
        });
    });

    //order (req. auth)
    app.get('/reports', isLoggedIn, function (req, res) {
        res.render('reports.ejs', {
            user : req.user
        });
    });

    //order (req. auth)
    app.get('/inventory', isLoggedIn, function (req, res) {
        res.render('inventory.ejs', {
            user : req.user
        });
    });

    //order (req. auth)
    app.get('/zones', isLoggedIn, function (req, res) {
        res.render('zones.ejs', {
            user : req.user
        });
    });

    //logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
	});
};