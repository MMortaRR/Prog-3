app.get("/",function(req,res){
    res.send("hello gev jan");
});

app.get("/name/:name",function(req,res){
    var name = req.params.name;
    res.send("<h1>Hello " + name + " jan</h1>")
});

app.get("/google",function(req,res){
    res.redirect("http://google.com");
});

app.get("/google/:search",function(req,res){
    var search = req.params.search;
    res.redirect("http://google.com/search?q="+search)
});

app.get("/*",function(req,res){
    res.send("Error 404");
});