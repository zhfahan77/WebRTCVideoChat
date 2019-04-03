var express = require("express");
var app = express();
var path = require("path");

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://" + req.headers.host);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Middlewere to log request
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

// Use express static to show static contents
app.use(express.static(path.join(__dirname, '.')));

// Routing Setup
app.use(function apiChecker(req, res, next) {
    res.sendFile(path.join(__dirname, './index.html'));
});

// declaring ports
var port = 5000;

// listening to port and logging
app.listen(port);
