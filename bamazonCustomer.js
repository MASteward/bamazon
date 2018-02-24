var Table = require('cli-table');
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  beginProgram();
});

function beginProgram(){
  connection.query("SELECT * FROM products", function(err, results) {
    var table = new Table({
      head: ["Id", "Product Name", "Price($)"],
      colWidth: [100, 200, 100]
    });
    for (var i = 0; i < results.length; i++) {
      table.push([results[i].item_id, results[i].product_name, results[i].price]);
    }
    console.log(table.toString());
    checkout()
  })
  
}

function checkout() {
  connection.query("SELECT * FROM products", function(err, results) {
    inquirer
      .prompt([
        {
          name: "purchase_Id",
          type: "input",
          message: "Please enter the ID number to add product to cart: ",
          validate: function(num) {
            if (isNaN(num) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: "quantity",
          type: "input",
          message: "Please enter the quantity for purchase: ",
          validate: function(num) {
            // console.log("works here");
            if (isNaN(num) == false){
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        var userQuantity = parseInt(answer.quantity);
        var userItem = parseInt(answer.purchase_Id);

        console.log("Product Number", userItem);
        console.log("User's Quantity", userQuantity);
        
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id == userItem) {
            chosenItem = results[i];
          }
        }
        if (userQuantity < chosenItem.stock_quantity) {
          var updatedProduct = chosenItem.stock_quantity - userQuantity;
          var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: updatedProduct
              },
              {
                item_id: userItem
              }
            ],

            function(error, res) {
              if (error) throw err;
              var total = (userQuantity * chosenItem.price).toFixed(2);
              console.log("Item added to cart!");
              
              console.log("Your total amount is: $" + total);
              console.log(res.affectedRows + " product updated!\n");
            }
          );
          console.log(query.sql);
          beginProgram();
        }
        else {
          console.log("We currently do not have that amount in our inventory.");
          console.log("We apologize for the inconvience, please call the store and we can assist with placing a special order for that amount.");
        }
      });
  });
};