var indexTemplate = require('../views/index.marko');
var loginTemplate = require('../views/login.marko');
var signupTemplate = require('../views/signup.marko');
var mapsTemplate = require('../views/maps.marko');
var profileTemplate = require('../views/profile.marko');

// load the map entry model
var mapEntry = require('../models/mapEntry');

module.exports = function(app, passport) {
    
// =============================================================================
// NORMAL ROUTES ===============================================================
// =============================================================================

    // SHOW THE HOME PAGE ===========
    app.get('/', isLoggedIn, function(req, res) {
        res.marko(indexTemplate);
    });

    // PROFILE SECTION =================================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.marko(profileTemplate, { 
            user : req.user
        });
    });    
    
    // MAPS SECTION =================================
    app.get('/maps', isLoggedIn, function(req, res) {
        res.marko(mapsTemplate, { 
            user : req.user
        });
    });


    // LOGOUT =============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // LOGIN =============================
    // show the login form
    app.get('/login', function(req, res) {
        res.marko(loginTemplate, { 
            message: req.flash('loginMessage') 
        });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // SIGNUP =============================
    // show the signup form
    app.get('/signup', function(req, res) {
        res.marko(signupTemplate, { 
            message: req.flash('signupMessage') 
        });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // Map Functions =============================
    // process a new map entry
    app.post('/mapentry', function(req, res) {
        var mapEntryItem = new mapEntry({
            lat: req.body.lat,
            lng: req.body.lng,
            mapEntryId: req.body.mapEntryId
        })

        mapEntryItem.save(function (err, mapEntryItem) {
            if (err) { 
                return err; 
            }
            res.status(201).json(mapEntryItem);
        })
    });
        
    // process a new map entry
    app.get('/mapentries', function(req, res) {
        mapEntry.find(function(err, mapEntryItems) {
            if (err) { 
                return err;
            }
            res.status(201).json(mapEntryItems);
        })
    });

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    /*app.get('/connect/local', function(req, res) {
        res.marko(connectLocalTemplate, { 
            message: req.flash('loginMessage') 
        });
        
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));*/

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    /*app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });*/
};

// =============================================================================
// ROUTE MIDDLEWARE TO ENSURE USER IS LOGGED IN ================================
// =============================================================================

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}