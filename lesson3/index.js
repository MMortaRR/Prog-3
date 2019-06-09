var express = require("express");
var app = express();

app.use(express.static("C:/Users/vando/Desktop/Prog-3/GameOfLife"));

app.get("/",function(req,res){
    res.redirect("index.html");
});

app.listen(3000,function(){
    console.log("example is running on port 3000");
});


