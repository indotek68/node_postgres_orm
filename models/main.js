var Person = require('./person');

var Models = {};

Models.Person = Person;
// var newPerson = {firstname: "Bob", lastname:"Builder"}

// Models.Person.create(newPerson, function(err,person){
// 	console.log("Put myself into the database");
// });

// Models.Person.all(function(err, people){
//   console.log(people);
// });



// Models.Person.findBy("id", 1, function(err, person){
//   console.log("found", person);
  // person.update({firstname: "sam", lastname: "creek"}, function(err, person){
  //   console.log("UPDATED:", person)
  // });
//})


// Models.Person.findBy("id", 10, function(err, person){
//   console.log("found", person);
//   person.destroy(function(person){
//   	console.log("destroy", person)
//   });
// })

module.exports = Models;