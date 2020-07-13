const Movie = require('../models/movie.model');

exports.test = function (req, res) {
    res.send('Greetings from the Movie controller!');
};

exports.movie_create = function (req, res) {
    let movie = new Movie(
        {
            name: req.body.name,
            rating: req.body.rating
        }
    );

    movie.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};