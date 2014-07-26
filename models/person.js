var db = require('./db');

function Person(params) {
  this.firstname = params.firstname;
  this.lastname = params.lastname;
  this.id = params.id;
};


Person.all = function(callback){
  db.query("SELECT * FROM people",[], function(err, res){
    var allPeople = [];
    // do something here with res
    res.rows.forEach(function(params){
      allPeople.push(new Person(params));
    });
    //console.log(allPeople)
    callback(err, allPeople);
  });
}

Person.findBy = function(key, val, callback) {
  db.query("SELECT * FROM people WHERE " + key + "= $1",[val], function(err, res){
    var foundRow, foundPerson;
    //console.log(res.rows)
    foundRow = res.rows,
    foundRow.forEach(function(params){
      foundPerson = new Person(params);
    })
    // do something here with res
    callback(err, foundPerson);
  });
};



Person.create = function(params, callback){
  db.query("INSERT INTO people (firstname, lastname) VALUES ($1, $2)", [params.firstname, params.lastname], function(err, res){
    var createdRow, newPerson;
    callback(err, newPerson);
  });
};

Person.prototype.update = function(params, callback) {
  var colNames = [];
  var colVals = [];
  var count = 2;

  for(var key in this) {
    if(this.hasOwnProperty(key) && params[key] !== undefined){
      var colName = key + "=$" + count;
      colNames.push(colName);
      colVals.push(params[key]);
      count++;
    }
  }

  var statement = "UPDATE people SET " + colNames.join(", ") + " WHERE id=$1 RETURNING *";
  var values = [this.id].concat(colVals);
  console.log("Running:");
  console.log(statement, "with values", values);
  var _this = this;
  db.query(statement, values, function(err, res) {
    var updatedRow;
    if(err) {
      console.error("OOP! Something went wrong!", err);
    } else {
      updatedRow = res.rows[0];
      _this.firstname = updatedRow.firstname;
      _this.lastname = updatedRow.lastname;
    }
    callback(err, _this)
  });
}

Person.prototype.destroy = function(callback){
  db.query("DELETE FROM people WHERE id=$1", [this.id], function(err, res) {
     console.log("Delete " + this.id)
     callback(err)
  });
}

module.exports = Person;
