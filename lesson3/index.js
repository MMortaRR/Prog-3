
var express = require("express");
var app = express();

app.get("/google/:search", function (req, res) {
    var search = req.params.search;
    res.redirect("https://www.google.com/search?q=" + search);
});

app.get("/*", function (req, res) {
    res.send("error 404");
});

app.listen(3000, function () {
    console.log("Example is running on port 3000");
});


