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
	}
	
}