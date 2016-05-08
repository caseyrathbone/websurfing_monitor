/* app.js */

var express = require('express');
var parser = require('body-parser');
var datastore = require('./datastore');
var fs = require('fs');

var STATIC_FILES = "static/";

app = express();

// Configure parser for simple text content from Chrome Extension POST.
app.use(parser.text({ type: "text/plain" }));

// Simple console logging.
app.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url);
    next(); 
});

app.get('/', function(req, res) {
    
    // Evaluate if serve-static functionality would clean up
    fs.readFile(STATIC_FILES + "index.html", function (error, fileContents) {
        if (error) {
            console.dir(error);
            res.writeHead(500);
            res.end();
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(fileContents);
        } 
    });
        
});

app.get('/myMonitoringService', function(req, res) {
    var returnData = datastore.getData();
    res.send(returnData);
});

app.post('/myMonitoringService', function(req, res) {
    var data = JSON.parse(req.body);
    if (data.entries) {
        data.entries.forEach(function (element, index, array) {
            datastore.addData(element); 
        });
    }
    res.send("data received"); 
});

app.listen(8080, function() {
    console.log("Web service initialized...");
});
