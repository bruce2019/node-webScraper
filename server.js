var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

const movie = require('./routes/movie.route'); // Imports routes for the products
const Movie = require('./models/movie.model');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/movies', movie);


// Set up mongoose connection


/* const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://movies123:movies123@movieswebscraper.jk3b3.mongodb.net/movies?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */


//let dev_db_url = 'mongodb+srv://movies:movies123@@movieswebscraper.jk3b3.mongodb';
const uri = "mongodb+srv://movies123:movies123@movieswebscraper.jk3b3.mongodb.net/product?retryWrites=true&w=majority";
let mongoDB = process.env.MONGODB_URI || uri;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true  }).then(
  ()=>{
    console.log("connected to mongoDB")},
 (err)=>{
     console.log("err",err);
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error::'));


app.get('/scrape', function(req, res){

    url = 'http://www.imdb.com/title/tt0468569/';

    var title, rating;
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            $('.title_wrapper').filter(function(){
              var data = $(this);

              title = data.children().first().text();
              console.log('title : ',title)

              var release = data.children().next().text();
              console.log('release : ',release)
            })

            $('.ratingValue').filter(function(){
              var data = $(this);
              //console.log('data : ',data)
              rating = data.children().text();
              console.log('rating : ',rating)
            })

            $('.txt-block', '#titleDetails').filter(function(){
              var data = $(this);

              var value = data.children().text();
              console.log('other details : ',value)
            })
        }

        let movie = new Movie(
            {
                name: title,
                rating: rating
            }
        );
    
        movie.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send('Product Created successfully')
        })
        //res.send('Check your console!')
    })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;