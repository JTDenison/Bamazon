var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3336,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

//  console.log to show connection established
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log("Welcome to bamazon, where you can GIT stuff.");
    bamazon();
});

//main bamazon function buy/sell
var bamazon = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        inquirer.prompt({
            name: "choice",
            type: "list",
            choices: function() {
                var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].product_name);

                }
                return choiceArray;
            },
            message: "What is the ID of the product you'd like to buy?"
        }).then(function(answer) {
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === answer.choice) {
                    var chosenItem = res[i];
                    inquirer.prompt({
                        name: "quantity",
                        type: "input",
                        message: "How many would you like to buy?"
                    }).then(function(answer) {
                        if (chosenItem.stock_quantity < parseInt(answer.quantity)) {
                            console.log("There is not any " + chosenItem.product_name + " left to GIT today.");
                            bamazon();
                        } else {
                            var orderTotal = chosenItem.price * parseInt(answer.quantity);
                            console.log("Thanks! Your total is " + orderTotal);
                            connection.query("UPDATE products SET ? WHERE ?", [{
                                stock_quantity: chosenItem.stock_quantity - parseInt(answer.quantity)
                            }, {
                                product_name: chosenItem.product_name
                            }], function(err, res) {
                                if (err) throw err;
                                inquirer.prompt({
                                    name: "end",
                                    type: "list",
                                    message: "Would you like to GIT more? Yes or No?",
                                    choices: ["yes", "no"]
                                }).then(function(answer) {
                                    if (answer.end === "yes") {
                                        bamazon();
                                    } else {
                                        console.log("Ya'll come back now, ya'hear!!");
                                        connection.end(function(err) {});
                                    }
                                });
                            });
                        }
                    });
                }
            }
        });
    });
};
