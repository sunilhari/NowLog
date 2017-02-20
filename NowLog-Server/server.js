// Set up
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
var Schema = mongoose.Schema;

// Configuration
mongoose.connect('mongodb://10.21.253.155:27017/NowLog');

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Models

var LogSchema = new Schema({
        date: String,
        description: String,
        user: String
    }),
    Log = mongoose.model('Log', LogSchema),
    log = new Log();;
//Get All Logs
app.get('/api/logs', function (req, res) {
    console.log("Fetching All  Logs");
    Log.find({}).sort({date:-1}).exec(function (err, logs) {
        (err && res.send(err) && console.log(err)) || res.json(logs);
    });
});
//Insert a log
app.post('/api/logs', function (req, res) {
    log.user = req.body.user;
    log.description = req.body.description;
    log.date = new Date().getTime();
    log.save(function (err) {
        (err && res.send(err)) || (console.log('Inserted') &&  res.send({"message":"Success"}));
    });
});
app.listen(8080);
console.log("App listening on port 8080");