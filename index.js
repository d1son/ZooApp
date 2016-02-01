// main file for zoo app

var mysql = require('mysql');
var prompt = require("prompt");
prompt.start();
prompt.message = "";
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zoo_db'

});

// test to see if the connection is working correctly
// connection.connect(function(err) {
//         if (err) {
//             console.error('error connecting: ' + err.stack);
//             return;
//         };
//         console.log('connected as id ' + connection.threadId);
//     });

var zoo = {
	welcome: function(){
		console.log("Welcome to the Zoo and Friends App~!!");
	},
	menu: function(){
		console.log('Enter (A) ----- to Add a new Animal to the Zoo!');
		console.log("")
    console.log('Enter (U) ----- to Update info on an animal in the Zoo!');
    console.log("")
    console.log('Enter (V) ----- to Visit the animals in the Zoo!');
    console.log("")
    console.log('Enter (D) ----- to Adopt an animal from the Zoo!');
    console.log("")
    console.log('Enter (Q) ----- to Quit and exit the Zoo!');
    console.log("")
	},
	add: function(input_scope){
		var current scope = input_scope;
		console.log("To add an animal to the zoo please fill out the following form for us!");
		prompt.get(["caretaker_id", "name", "type", "age",] function(err, result){
			var query = "INSERT INTO animals (caretaker_id, name, type, age) VALUES (?,?,?,?)";
			var userResult = [result.caretaker_id, result.name, result.type, result.age];

			connection.query(query, userResult, function(err, results){
				if(err) throw err;
				console.log("Inserted" + result.name + " into the Zoo database!");
			});
		});
		currentScope.menu();
		currentScope.promptUser();
	};
	visit: function(){
		console.log("Enter (I): ------> do you know the animal by it's id? We will visit that animal!");
		console.log("");
		console.log("Enter (N): ------> do you know the animal by it's name? We will visit that animal!");
		console.log("");
		console.log("Enter (A): ------> here's the count for all animals in all locations!");
		console.log("");
		console.log("Enter (C): ------> here's the count for all animals in this one city!");
		console.log("");
		console.log("Enter (O): ------> here's the count for all the animals in all locations by the type you specified!");
		console.log("");
		console.log("Enter (Q): ------> Quits to the main menu!");
		console.log("");
		currentScope.visit();
		currentScope.view(currentScope);
	};
	view: function(){
		var currentScope = input_scope;
		console.log("Please choose what you would like to visit!");
		prompt.get(["visit"] function(err, result){
			if(result.visit == "Q"){
				currentScope.menu();
			}
			else if (result.visit == "O"){
				currentScope.type(input_scope);
			}
			else if (result.type == "I"){
				currentScope.type(input_scope);
			}
			else if (result.animId == "N"){
				currentScope.name(input_scope);
			}
			else if (result.name == "A"){
				currentScope.all(input_scope);
			}
			else if (result.all == "C"){
				currentScope.care(input_scope);
			}
			else {
				console.log("Sorry! Didn't get that, come again?");
			}
		});
		currentScope.visit();
		currentScope.view(currentScope)
	};
	type: function(input_scope){
		var currentScope = input_scope;
		console.log("Enter animal type to find how many animals we have of that type");
		prompt.get(["animal_type"] function(err, result){
			var query = "SELECT COUNT (type) FROM animals WHERE type = ?";
			var userResult = result.animal_type;
			connection.query(query, userResult, function(err, result){
				if (err) throw err;
				currentScope.menu();
				currentScope.promptUser();
			});
		});
	};
	care: function(input_scope){
		var currentScope = input_scope;
		console.log("Enter city name NY/SF");
		prompt.get(["city_name"] function(err, result){
			var query = "SELECT COUNT (*) FROM animals,caretakers WHERE caretakers.city=? AND caretaker.id = animals.caretaker_id"
			var userResult = results.city_name;
			connection.query(quert, userResult function(err, result){
				if (err) throw (err);
				currentScope.visit();
				currentScope.view(currentScope);
			});
		});
	}
}