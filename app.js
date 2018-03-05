var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

//home route
app.get("/", function(req, res){
    res.render("search");
});

// Search for user entered input using the input text box
app.get("/results", function(req, res){
    var query = req.query.search;
    console.log(query);
    var url1 = "http://www.omdbapi.com/?s=" + query;
    var url2 = "&apikey=thewdb";
    var combinedurl = url1 + url2;
    request(combinedurl, function(error, response, body){
       if(!error && response.statusCode == 200){
        var data = JSON.parse(body);
        res.render("results", {data: data});
      }  
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started!!");
});