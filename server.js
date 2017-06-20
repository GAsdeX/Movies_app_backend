// var http = require('http');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var app = express();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

    //some other code

app.get('/getmovies', function(req,res){
  console.log('get');
  db.collection('movies').find().toArray(function(err, result){
    if (err) throw err;
    else res.send(result);
  });
});

app.get('/getmovie/:_id', function(req,res){
  console.log('get');
  db.collection('movies').find({ _id : ObjectID(req.params._id)}).toArray(function(err, result){
    if (err) throw err;
    else res.send(result);
  });
});

app.post('/addmovie', function(req, res){
  console.log(req.body);
  db.collection('movies').insert(req.body ,function(err, result) {
    if (err) throw err;
    else res.send(result)
  })
})

app.delete('/dellmovie/:_id', function(req, res){
	console.log(req.params._id)
  db.collection('movies').remove({_id: ObjectID(req.params._id)}, function (err, result) {
          if (err) return res.send(err);
          else res.send(result)
          // res.json({ message: 'Deleted' });
    });
})

MongoClient.connect('mongodb://localhost:27017/movies', function(err, database) {
    if (err) {
        console.log(err);
        return res.sendStatus(500)
    } else {
        db = database;
        app.listen(3000, function() {
            console.log('done');
        })
    }
})

// http.createServer(function (request, response) {
// response.writeHead(200, {
//     'Content-Type': 'text/plain',
//     'Access-Control-Allow-Origin' : '*',
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
// });
// response.end('Hello World\n');
// }).listen(3000);

// Title: Blazing Saddles
// Release Year: 1974
// Format: VHS
// Stars: Mel Brooks, Clevon Little, Harvey Korman, Gene Wilder, Slim Pickens, Madeline Kahn
