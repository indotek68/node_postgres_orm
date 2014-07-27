var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Person = require('./models/main.js').Person,
  app = express();



app.set("view engine", "ejs");
// Middleware
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));




app.get("/people", function(req, res){
  Person.all(function(err, people){
    res.render("people/index", {people: people})
    });
});

app.get("/people/new", function(req, res){
  res.render("people/new")
});

app.get("/people/:id", function(req,res){
  var id = Number(req.params.id);

  Person.findBy("id", id, function(err, foundPerson){
    res.render("people/show", {person: foundPerson })
  });
});

app.get("/people/:id/edit", function(req,res){
  var id = Number(req.params.id);

  Person.findBy("id", id, function(err, foundPerson){
    res.render("people/edit", {person: foundPerson })
  });
});



app.post("/people", function(req, res){
  var createdPerson = req.body.person;
  var id = Number(req.params.id);
  Person.create(createdPerson, function(err, newPerson){
  });
  res.redirect("/people")
});

app.delete("/people/:id", function(req, res){
  var id = Number(req.params.id);
  Person.findBy("id", id, function(err, foundPerson){
    //console.log(Object.getOwnPropertyNames(foundPerson))
    foundPerson.destroy(function(err){
      console.log("Deleted " + id)
    });
  })
  res.redirect("/people");
});

app.put("/people/:id", function(req,res){
  var firstName = req.body.person.firstname;
  var lastName = req.body.person.lastname;
  var id = Number(req.params.id);

  Person.findBy("id", id, function(err, foundPerson){
    console.log(req.body.person)
    foundPerson.update({firstname: firstName, lastname: lastName}, function(err, foundPerson){
      console.log(foundPerson);
    })
  })
  res.redirect("/people");
})

app.listen(3000, function(){
  console.log("THE SERVER IS LISTENING ON localhost:3000");
});
