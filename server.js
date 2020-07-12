var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

const movie = require('./routes/movie.route'); // Imports routes for the products
const bodyParser = require('body-parser');
app.use('/movies', movie);

app.get('/scrape', function(req, res){

    url = 'http://www.imdb.com/title/tt0468569/';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            $('.title_wrapper').filter(function(){
              var data = $(this);

              var title = data.children().first().text();
              console.log('title : ',title)

              var release = data.children().next().text();
              console.log('release : ',release)
            })

            $('.ratingValue').filter(function(){
              var data = $(this);
              //console.log('data : ',data)
              var rating = data.children().text();
              console.log('rating : ',rating)
            })

            $('.txt-block', '#titleDetails').filter(function(){
              var data = $(this);

              var value = data.children().text();
              console.log('other details : ',value)
            })
        }
        res.send('Check your console!')
    })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;