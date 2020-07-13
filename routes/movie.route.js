const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const movie_controller = require('../controllers/movie.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', movie_controller.test);module.exports = router;

router.post('/create', movie_controller.movie_create);